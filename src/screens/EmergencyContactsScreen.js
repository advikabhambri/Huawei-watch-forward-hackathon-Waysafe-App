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
  const { contacts, addContact, setPrimaryContact } = useApp();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");

  const handleAdd = () => {
    if (!name.trim() || !phone.trim() || !relation.trim()) return;
    addContact({ name: name.trim(), phone: phone.trim(), relation: relation.trim() });
    setName("");
    setPhone("");
    setRelation("");
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Emergency Contacts"
        subtitle="Add and manage the people who will be notified during an alert."
      />

      <SectionCard>
        <Text style={styles.sectionTitle}>Add caregiver contact</Text>
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
          label="Save Contact"
          variant="danger"
          icon={<MaterialCommunityIcons name="content-save-outline" size={20} color={colors.white} />}
          onPress={handleAdd}
        />
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
                <Text style={styles.makePrimary} onPress={() => setPrimaryContact(contact.id)}>
                  Make primary
                </Text>
              ) : null}
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
  makePrimary: {
    color: colors.red,
    fontWeight: "800",
    fontSize: 12,
    paddingTop: 5,
  },
});