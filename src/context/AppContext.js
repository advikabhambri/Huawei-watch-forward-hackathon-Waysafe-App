import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  accessibilityProfiles,
  caregiverStatus,
} from "../data/mockData";
import { syncApi } from "../services/syncApi";

const AppContext = createContext(null);

const getProfileById = (profileId) =>
  accessibilityProfiles.find((profile) => profile.id === profileId) || accessibilityProfiles[0];

const createAlertRecord = (type, profileId) => {
  const profile = getProfileById(profileId);
  return {
    id: `alert-${Date.now()}`,
    type,
    timestamp: new Date().toISOString(),
    status: "Pending",
    profileId,
    profileTitle: profile.title,
    severity:
      type === "Fire Alert"
        ? "Critical"
        : type === "Gas Leak Alert"
        ? "High"
        : type === "Evacuation Alert"
        ? "High"
        : "Urgent",
    supportMessages: profile.supportMessages,
  };
};

const mapHistoryRecord = (record) => ({
  ...record,
  type: record.title || record.type || "Emergency Alert",
  timestamp: record.timestamp || record.createdAt || record.resolvedAt || new Date().toISOString(),
  status:
    String(record.status).toLowerCase() === "resolved"
      ? "Resolved"
      : String(record.status).toLowerCase() === "active"
      ? "Pending"
      : record.status || "Pending",
});

export function AppProvider({ children }) {
  const [selectedProfileId, setSelectedProfileId] = useState(accessibilityProfiles[0].id);
  const [contacts, setContacts] = useState([]);
  const [alertRecords, setAlertRecords] = useState([]);
  const [activeAlert, setActiveAlert] = useState(null);
  const [lastSOS, setLastSOS] = useState(null);
  const [syncError, setSyncError] = useState(null);

  const selectedProfile = useMemo(
    () => getProfileById(selectedProfileId),
    [selectedProfileId]
  );

  const hydrateFromBackend = async () => {
    try {
      const [stateResponse, historyResponse, sosResponse] = await Promise.all([
        syncApi.getSyncState(),
        syncApi.getHistory(),
        syncApi.getLatestSOS(),
      ]);
      const sharedState = stateResponse?.state || {};
      setSelectedProfileId(sharedState.profile || accessibilityProfiles[0].id);
      setContacts(sharedState.contacts || []);
      setActiveAlert(sharedState.activeEmergency || null);
      const history = historyResponse?.history || sharedState.history || [];
      setAlertRecords(history.map(mapHistoryRecord));
      setLastSOS(sosResponse?.sos || sharedState.sos || null);
      setSyncError(null);
    } catch (error) {
      setSyncError(error.message);
    }
  };

  useEffect(() => {
    hydrateFromBackend();
    const intervalId = setInterval(hydrateFromBackend, 4000);
    return () => clearInterval(intervalId);
  }, []);

  const updateSelectedProfileId = async (profileId) => {
    setSelectedProfileId(profileId);
    try {
      await syncApi.updateProfile(profileId);
      setSyncError(null);
    } catch (error) {
      setSyncError(error.message);
    }
  };

  const triggerAlert = async (type) => {
    const record = createAlertRecord(type, selectedProfileId);
    try {
      const response = await syncApi.triggerEmergency({
        type: type.toLowerCase().includes("gas")
          ? "gas"
          : type.toLowerCase().includes("evac")
          ? "evacuation"
          : "fire",
        severity: "high",
        title: type,
        message: record.supportMessages?.[0] || record.type,
      });
      setActiveAlert(response.activeEmergency || record);
      setSyncError(null);
      await hydrateFromBackend();
      return response.activeEmergency || record;
    } catch (error) {
      setSyncError(error.message);
      return record;
    }
  };

  const markSafe = async () => {
    try {
      await syncApi.markSafe();
      await syncApi.resolveEmergency();
      await hydrateFromBackend();
    } catch (error) {
      setSyncError(error.message);
    }
  };

  const sendSOS = async (emergencyType) => {
    try {
      const response = await syncApi.sendSOS({
        emergencyType,
        location: "1.3521,103.8198",
        message: `SOS request from phone for ${emergencyType}`,
      });
      setLastSOS(response.sos || null);
      setSyncError(null);
      return response.sos || null;
    } catch (error) {
      setSyncError(error.message);
      return null;
    }
  };

  const addContact = async (contact) => {
    try {
      await syncApi.addContact(contact);
      await hydrateFromBackend();
    } catch (error) {
      setSyncError(error.message);
    }
  };

  const updateContact = async (contactId, contact) => {
    try {
      await syncApi.updateContact(contactId, contact);
      await hydrateFromBackend();
    } catch (error) {
      setSyncError(error.message);
    }
  };

  const deleteContact = async (contactId) => {
    try {
      await syncApi.deleteContact(contactId);
      await hydrateFromBackend();
    } catch (error) {
      setSyncError(error.message);
    }
  };

  const setPrimaryContact = async (contactId) => {
    const selected = contacts.find((contact) => contact.id === contactId);
    if (!selected) return;
    try {
      await syncApi.updateContact(contactId, { ...selected, primary: true });
      await hydrateFromBackend();
    } catch (error) {
      setSyncError(error.message);
    }
  };

  const value = {
    accessibilityProfiles,
    selectedProfile,
    selectedProfileId,
    setSelectedProfileId: updateSelectedProfileId,
    contacts,
    alertRecords,
    activeAlert,
    caregiverStatus,
    lastSOS,
    syncError,
    triggerAlert,
    markSafe,
    sendSOS,
    addContact,
    updateContact,
    deleteContact,
    setPrimaryContact,
    refreshSyncState: hydrateFromBackend,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}