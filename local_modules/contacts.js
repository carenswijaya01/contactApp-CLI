/** import file system (file handling) dan readline (IO) from core module */
const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");
/** hidupin kalo mau input dari console */
// const { rejects } = require("assert");
// const { resolve } = require("path");

/** hidupin kalo mau input dari console */
// const readline = require("readline");

/** siapin interface untuk readline (set input dan output interface) */
/** hidupin kalo mau input dari console */
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

/** membuat folder data bila belum ada */
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

/** membuat file contacts.json bila belum ada */
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

/** bikin fungsi untuk tulis pertanyaan (daripada pakai callback, nanti malah jadi callback hell / semakin menjorok ke dalam) */
/** hidupin kalo mau input dari console */
// const tulisPertanyaan = (pertanyaan) => {
//   return new Promise((resolve, reject) => {
//     rl.question(pertanyaan, (jawaban) => {
//       resolve(jawaban);
//     });
//   });
// };

const loadContact = () => {
  /** baca isi json */
  const file = fs.readFileSync("data/contacts.json", "utf-8");

  /** ubah isi json menjadi array */
  const contacts = JSON.parse(file);

  return contacts;
};

/** bikin fungsi simpanContact untuk handle insert json yg dipanggil di app.js */
const simpanContact = (nama, email, noHP) => {
  /** bikin objek contact */
  const contact = { nama, email, noHP };

  /** load contact */
  const contacts = loadContact();

  /** cek duplikat */
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(
      chalk.red.inverse.bold("Contact sudah terdaftar, gunakan nama lain!")
    );
    return false;
  }

  /** cek email */
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email tidak valid!"));
      return false;
    }
  }

  /** cek no HP */
  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.log(chalk.red.inverse.bold("Nomor HP tidak valid!"));
    return false;
  }

  /** push ke array */
  contacts.push(contact);

  /** overwrite json dengan yg terbaru */
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log(
    chalk.green.inverse.bold("Terima kasih sudah memasukkan data Anda!")
  );

  /** hidupin kalo mau input dari console */
  // rl.close();
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.inverse.bold("Daftar Kontak:"));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  console.log(chalk.cyan.inverse.bold(contact.nama));
  console.log(contact.noHP);

  if (contact.email) {
    console.log(contact.email);
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));

  console.log(chalk.green.inverse.bold(`Kontak ${nama} berhasil dihapus!`));
};

/** hapus tulis pertanyaan kalau ga lagi pake input console */
// module.exports = { tulisPertanyaan, simpanContact };

module.exports = { simpanContact, listContact, detailContact, deleteContact };
