const fs = require("node:fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(
  path.dirname("./db/contacts.json"),
  "contacts.json"
);

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contactsList = JSON.parse(data);
  return contactsList;
}

async function getContactById(contactId) {
  const contactsList = await listContacts();
  const contact = contactsList.find((contact) => contact.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const updatedContactsList = contactsList.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContactsList));
  const contact = getContactById(contactId);
  return contact || null;
}

async function addContact({ name, email, phone }) {
  const id = nanoid();
  const newContact = { id, name, email, phone };
  const contactsList = await listContacts();
  const updatedContactsList = [...contactsList, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContactsList));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
