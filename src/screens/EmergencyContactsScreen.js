import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useApp } from "../context/AppContext";
import PrimaryButton from "../components/PrimaryButton";
import ScreenHeader from "../components/ScreenHeader";
import SectionCard from "../components/SectionCard";
import StatusPill from "../components/StatusPill";
import { colors, shadows } from "../theme/colors";

export default function EmergencyContactsScreen() {
  const { contacts, addContact, updateContact, deleteContact, setPrimaryContact } = useApp();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");
  const [editingId, setEditingId] = useState(null);

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setPhone("");
    setRelation("");
  };

  const handleSave = () => {
    if (!name.trim() || !phone.trim() || !relation.trim()) return;
    if (editingId) {
      updateContact(editingId, { name: name.trim(), phone: phone.trim(), relation: relation.trim() });
      resetForm();
      return;
    }
    addContact({ name: name.trim(), phone: phone.trim(), relation: relation.trim() });
    resetForm();
  };

  const handleEdit = (contact) => {
    setEditingId(contact.id);
    setName(contact.name);
    setPhone(contact.phone);
    setRelation(contact.relation);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Emergency Contacts"
        subtitle="Add and manage the people who will be notified during an alert."
      />

      <SectionCard>
        <Text style={styles.sectionTitle}>
          {editingId ? "Edit caregiver contact" : "Add caregiver contact"}
        </Text>
        <View style={styles.form}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Caregiver name"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone number"
            placeholderTextColor={colors.muted}
            keyboardType="phone-pad"
            style={styles.input}
          />
          <TextInput
            value={relation}
            onChangeText={setRelation}
            placeholder="Relation"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
        </View>

        <PrimaryButton
          label={editingId ? "Update Contact" : "Save Contact"}
          variant="danger"
          icon={<MaterialCommunityIcons name="content-save-outline" size={20} color={colors.white} />}
          onPress={handleSave}
        />
        {editingId ? (
          <Text style={styles.cancelEdit} onPress={resetForm}>
            Cancel editing
          </Text>
        ) : null}
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionTitle}>Saved contacts</Text>
        <View style={styles.list}>
          {contacts.map((contact) => (
            <View key={contact.id} style={styles.contactCard}>
              <View style={styles.contactAvatar}>
                <MaterialCommunityIcons name="account" size={22} color={colors.white} />
              </View>
              <View style={styles.contactCopy}>
                <View style={styles.row}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  {contact.primary ? <StatusPill label="Primary" tone="safe" /> : null}
                </View>
                <Text style={styles.contactMeta}>{contact.relation}</Text>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
              </View>
              {!contact.primary ? (
                <View style={styles.actions}>
                  <Text style={styles.editAction} onPress={() => handleEdit(contact)}>
                    Edit
                  </Text>
                  <Text style={styles.deleteAction} onPress={() => deleteContact(contact.id)}>
                    Delete
                  </Text>
                  <Text style={styles.makePrimary} onPress={() => setPrimaryContact(contact.id)}>
                    Make primary
                  </Text>
                </View>
              ) : (
                <View style={styles.actions}>
                  <Text style={styles.editAction} onPress={() => handleEdit(contact)}>
                    Edit
                  </Text>
                  <Text style={styles.deleteAction} onPress={() => deleteContact(contact.id)}>
                    Delete
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </SectionCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 24,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.navy,
    marginBottom: 12,
  },
  form: {
    gap: 10,
    marginBottom: 14,
  },
  input: {
    minHeight: 54,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: colors.background,
    color: colors.navy,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 15,
    fontWeight: "700",
  },
  list: {
    gap: 12,
  },
  cancelEdit: {
    marginTop: 12,
    color: colors.muted,
    fontWeight: "700",
    textAlign: "center",
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 16,
    borderRadius: 20,
    backgroundColor: colors.background,
    ...shadows.card,
  },
  contactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  contactCopy: {
    flex: 1,
    gap: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  contactName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "900",
    color: colors.navy,
  },
  contactMeta: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.muted,
  },
  contactPhone: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.navy,
  },
  actions: {
    gap: 8,
    alignItems: "flex-end",
    paddingTop: 5,
  },
  editAction: {
    color: colors.navy,
    fontWeight: "800",
    fontSize: 12,
  },
  deleteAction: {
    color: colors.red,
    fontWeight: "800",
    fontSize: 12,
  },
  makePrimary: {
    color: colors.success,
    fontWeight: "800",
    fontSize: 12,
  },
});