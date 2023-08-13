const contacts = require("./contacts.js");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contacts.listContacts();
      return console.table(contactsList);
    case "get":
      const contact = await contacts.getContactById(id);
      return console.table(contact);

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.table(newContact);
    case "remove":
      const removedContact = await contacts.removeContact(id);
      return console.table(removedContact);

    default:
      console.warn(
        `\x1B[31m "${action}" is unknown action type! \n Use actions: list, get, add or remove`
      );
  }
}
const arr = hideBin(process.argv);
const { argv } = yargs(arr);
invokeAction(argv);
