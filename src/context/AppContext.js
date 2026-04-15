import React, { createContext, useContext, useMemo, useState } from "react";

import {
  accessibilityProfiles,
  alertHistory as initialAlertHistory,
  caregiverStatus,
  emergencyContacts as initialContacts,
} from "../data/mockData";

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

export function AppProvider({ children }) {
  const [selectedProfileId, setSelectedProfileId] = useState(accessibilityProfiles[0].id);
  const [contacts, setContacts] = useState(initialContacts);
  const [alertRecords, setAlertRecords] = useState(initialAlertHistory);
  const [activeAlert, setActiveAlert] = useState(null);
  const [lastSOS, setLastSOS] = useState(null);

  const selectedProfile = useMemo(
    () => getProfileById(selectedProfileId),
    [selectedProfileId]
  );

  const triggerAlert = (type) => {
    const record = createAlertRecord(type, selectedProfileId);
    setActiveAlert(record);
    setAlertRecords((current) => [record, ...current]);
    return record;
  };

  const markSafe = () => {
    if (!activeAlert) return;

    setAlertRecords((current) =>
      current.map((record) =>
        record.id === activeAlert.id ? { ...record, status: "Resolved" } : record
      )
    );
    setActiveAlert(null);
  };

  const sendSOS = (emergencyType) => {
    const payload = {
      emergencyType,
      caregiverName: caregiverStatus.name,
      locationShared: true,
      sentAt: new Date().toISOString(),
    };
    setLastSOS(payload);
    return payload;
  };

  const addContact = (contact) => {
    const nextContact = {
      ...contact,
      id: `contact-${Date.now()}`,
      primary: contacts.length === 0,
    };
    setContacts((current) => [nextContact, ...current]);
  };

  const setPrimaryContact = (contactId) => {
    setContacts((current) =>
      current.map((contact) => ({
        ...contact,
        primary: contact.id === contactId,
      }))
    );
  };

  const value = {
    accessibilityProfiles,
    selectedProfile,
    selectedProfileId,
    setSelectedProfileId,
    contacts,
    alertRecords,
    activeAlert,
    caregiverStatus,
    lastSOS,
    triggerAlert,
    markSafe,
    sendSOS,
    addContact,
    setPrimaryContact,
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