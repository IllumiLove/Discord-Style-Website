//©Coppyright by YukiDev&illumi (Đặng Hoàng Thiên Ân•照美冥你姊我嘎嘎牛逼)
const roleCode = document.querySelectorAll(".cir");
const audio = document.querySelector(".audio");
for (let i = 0; i < roleCode.length; i++) {
  const indexNum = i % 4;
  roleCode[i].classList.add(`active${indexNum}`);
}

// 檢查是否為白天的功能
function isDayTime() {
  const currentHour = new Date().getHours();
  return currentHour >= 7 && currentHour < 19;
}

//更新主題顏色的函數
function updateTheme() {
  const night = document.querySelector("#night");
  if (isDayTime()) {
    night.disabled = true;
  } else {
    night.disabled = false;
  }
}
updateTheme();
setInterval(updateTheme(), 300000);
//thingkibng  config
const thingKing = document.querySelector(".youThingKing");
thingKing.innerHTML = "大家好，我是Illumi。 ";
let userData = null;
//công táo  truyền id
const proflieDefaut = "472637182180458496";
let response;
// discord sync
async function fetchData() {
  try {
    response = await fetch(`https://api.lanyard.rest/v1/users/${proflieDefaut}`);
    const data = await response.json();
    userData = data;
    updateStatus();
    getAvtUser();
    getCaption();
    spotify();
    getAName();
    updateTheme();
    // getCodeding();
  } catch (error) {
    console.error("Đã xảy ra lỗi khi lấy dữ liệu:", error);
  }
}
//hàm get  ablum spotify  //
function spotify() {
  const songLink = document.querySelector(".songlink");
  const songImg = document.querySelector("#songimg");
  const songName = document.querySelector("#songname");
  const singer = document.querySelector("#singer");
  const album = document.querySelector("#album");
  const blackPink = document.querySelector("#blackpink");
  const listeningtoSpotify = document.querySelector(".playagames");
  if (userData && userData.data && userData.data.spotify) {
    listeningtoSpotify.style.display = "block";
    const spotify = userData.data.spotify;
    songName.innerHTML = `${spotify.song}`;
    songImg.setAttribute("src", `${spotify.album_art_url}`);
    singer.innerHTML = `by ${spotify.artist}`;
    songLink.setAttribute("href", `https://www.youtube.com/watch?v=dQw4w9WgXcQ`);
    if (
      spotify != null &&
      (spotify.artist == "BLACKPINK" ||
        spotify.artist == "JENNIE" ||
        spotify.artist == "ROSÉ" ||
        spotify.artist == "LISA" ||
        spotify.artist == "JISOO")
    ) {
      blackPink.disabled = false;
    } else {
      blackPink.disabled = true;
    }
    album.innerHTML = `On ${spotify.album}`;
  } else {
    if (listeningtoSpotify) {
      listeningtoSpotify.style.display = "none";
      blackPink.disabled = true;
    }
  }
}
//vng role //（禁止編輯本段！！！）
const vng = document.querySelector(".vng");
if (proflieDefaut !== "472637182180458496") {
  vng.style.display = "none";
} else {
  vng.style.display = "flex";
}
// hmaf 取得全域名稱和顯示名稱
function getAName() {
  const tick = "./svg/icons8-blue-tick.svg";
  const gobalName = document.querySelector("#gobalname");
  const displayName = document.querySelector("#displayname");
  if (userData && userData.data && userData.data.discord_user) {
    const user = userData.data.discord_user;
    gobalName.innerHTML = user.global_name;
    displayName.innerHTML = user.display_name;
  }
}
//hàm get custom caption từ API //
function getCaption() {
  const captionElement = document.querySelector("#caption");
  if (userData && userData.data && userData.data.spotify == null) {
    if (
      userData &&
      userData.data &&
      userData.data.activities &&
      userData.data.activities.length > 0
    ) {
      const activity = userData.data.activities[0]; //取得活動數組
      let customIcon = ""; // 初始化空的 customIcon 變數
      if (activity.emoji && activity.emoji.name) {
        // 檢查“emoji”物件中的“name”欄位是否存在
        customIcon = activity.emoji.name; // 如果「名稱」欄位存在，則為 customIcon 變數指派一個值
      }
      captionElement.innerHTML = `${customIcon} ${activity.state}`;
    } else {
      captionElement.innerHTML = "";
    }
  } else {
    if (
      userData &&
      userData.data &&
      userData.data.activities &&
      userData.data.activities.length > 0
    ) {
      const activity = userData.data.activities[0]; //取得活動數組
      let customIcon = ""; // 初始化空的 customIcon 變數
      if (activity.emoji && activity.emoji.name) {
        // 檢查“emoji”物件中的“name”欄位是否存在
        customIcon = activity.emoji.name; // 如果「名稱」欄位存在，則為 customIcon 變數指派一個值
      }
      captionElement.innerHTML = `${customIcon} ${activity.state}`;
    } else {
      captionElement.innerHTML = "";
    }
  }
}
//hàm get trạng thái on/off của tài khoản
function updateStatus() {
  const statusElement = document.querySelector("#statusimg");
  const statusList = {
    mobile: {
      offline: "./svg/offline-mobile.svg",
      online: "./svg/online-mobile.svg",
      idle: "./svg/idle-mobile.svg",
      dnd: "./svg/dnd-mobile.svg",
    },
    desktop: {
      offline: "./svg/offline.svg",
      online: "./svg/online.svg",
      idle: "./svg/idle.svg",
      dnd: "./svg/dnd.svg",
      streeming: "./svg/streaming.svg",
    },
  };
  if (userData.data.active_on_discord_mobile == true) {
    console.log("on mobile");
    statusElement.setAttribute("src", statusList.mobile[userData.data.discord_status]);
  } else if (
    userData.data.active_on_discord_desktop == true ||
    userData.data.active_on_discord_mobile == true
  ) {
    statusElement.setAttribute("src", statusList.desktop[userData.data.discord_status]);
  } else {
    statusElement.setAttribute("src", "./svg/offline.svg");
  }
}
//hàm lấy avt của user//
function getAvtUser() {
  const userAvt = document.querySelector("#userAvt");
  userAvt.setAttribute(
    "src",
    `https://cdn.discordapp.com/avatars/${userData.data.discord_user.id}/${userData.data.discord_user.avatar}?size=1024`
  );
}
//warning //
function warning() {
  console.log(" %c 暫停一下 !!!!", "font-size: 50px; color: red;");
  console.log(
    "是否有一些邪惡的謠言告訴你在這裡輸入一些內容來黑掉你姐姐的頁面？讓我們把它挖出來"
  );
  console.log(
    "%c 把廢話程式碼貼在這裡，有一天你會付fb或某個遊戲帳號然後去帳號開發:)),",
    "color:red"
  );
  console.log("如果您不知道自己在做什麼，請關閉控制台選項卡");
}
// no dev
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
warning();
window.onload = warning();
setInterval(fetchData, 3000);
window.onload = fetchData();
const gif = document.querySelector(".ilovevng").addEventListener("click", () => {
  song.play();
});
const song = document.querySelector(".song");
