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
  const contact = contactsList.find(
    (contact) => contact.id === String(contactId)
  );
  return contact || null;
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const index = contactsList.findIndex(
    (contact) => contact.id === String(contactId)
  );
  if (!~index) return null;
  const [removedContact] = contactsList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return removedContact;
}

async function addContact({ name, email, phone }) {
  const id = nanoid();
  const newContact = { id, name, email, phone };
  const contactsList = await listContacts();
  const updatedContactsList = [...contactsList, newContact];
  await fs.writeFile(
    contactsPath,
    JSON.stringify(updatedContactsList, null, 2)
  );
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
