const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const filterContact = contacts.find(({ id }) => id === contactId);
  return filterContact || null;
};

const updatedContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const deleteContacts = contacts.filter(({ id }) => id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(deleteContacts));
  return { message: "contact deleted" };
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const userId = contacts.map((item) => +item.id);
  const newContact = {
    id: String(Math.max(...userId) + 1),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updatedContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const contactsIndex = contacts.findIndex(({ id }) => id === contactId);
  if (contactsIndex === -1) {
    return null;
  }
  contacts[contactsIndex] = { id: contactId, name, email, phone };
  await updatedContacts(contacts);
  return contacts[contactsIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
