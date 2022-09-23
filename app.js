/** import yargs (ambil argument, tapi pake module luar) */
const yargs = require("yargs");
const contacts = require("./local_modules/contacts");

/** Contoh Command:
node app --help
node app list
node app add --nama="isiNama" --email="isiEmail" --noHP="isiNoHP"
node app detail --nama="isiNama"
node app delete --nama="isiNama"
*/
yargs
  .command({
    command: "add",
    describe: "Menambahkan contact baru",
    builder: {
      nama: {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "Nomor Handphone",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contacts.simpanContact(argv.nama, argv.email, argv.noHP);
    },
  })
  .demandCommand();

yargs.command({
  command: "list",
  describe: "Menampilkan daftar nama dan nomor hp",
  handler() {
    contacts.listContact();
  },
});

yargs.command({
  command: "detail",
  describe: "Menampilkan detail sebuah kontak berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.nama);
  },
});

yargs.command({
  command: "delete",
  describe: "Menghapus sebuah kontak berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.nama);
  },
});

yargs.parse();

/** mengambil argument dari command line bawaan node */
// const command = process.argv[2];
// if (command === "add") {
// } else if (command === "remove") {
// } else if (command === "list") {
// }

/** =========================== CONTACT APP CONSOLE 1.0 =========================== */

/** panggil contacts module */
// const contacts = require("./local_modules/contacts");

/** bikin proses inputan dengan metode async await */
// const main = async () => {
//   const nama = await contacts.tulisPertanyaan("Masukkan nama Anda: ");
//   const email = await contacts.tulisPertanyaan("Masukkan email Anda: ");
//   const noHP = await contacts.tulisPertanyaan("Masukkan no HP Anda: ");

//   contacts.simpanContact(nama, email, noHP);
// };

// main();
