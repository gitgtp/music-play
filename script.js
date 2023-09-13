document.addEventListener("DOMContentLoaded", function () {
  let but = document.getElementById("pp");
  let artist = document.getElementById("artist");
  let coverimg = document.getElementById("musicimg");
  let suffle=document.getElementById("suffle")
  let next = document.getElementById("next");
  let audiosrc = document.getElementById("audio");
  let ctime = document.getElementById("current");
  let due = document.getElementById("duration");
  let range = document.getElementById("progress");
  let repeat = document.getElementById("repeat");

  // array of bojects for music stuff
  let musiclist = [
    {
      music: "./music/future.mp3",
      artist: "DJ Khalid ft.Drake",
      cover: "./cover/club-dj-party-flyer-social-media-post_505751-3027.avif",
    },
    {
      music: "./music/beats.mp3",
      artist: "J.Balivin ft.Louis",
      cover:
        "./cover/dj-music-party-flyer-square-flyer-template_541010-305.avif",
    },
    {
      music: "./music/lofi.mp3",
      artist: "Bad Bunny ft.Louis",
      cover: "./cover/club-dj-party-flyer-social-media-post_505751-3059.avif",
    },
    {
      music: "./music/mixki.mp3",
      artist: "Dady Yankee ft.Louis",
      cover:
        "./cover/saturday-night-party-social-media-instagram-template_505751-3745.avif",
    },
  ];
  
  //function for shuffle
  suffle.addEventListener('click',function(){
  let randomindex=getrandomtrackindex(currentindex,musiclist.length)
  currentindex=randomindex
  console.log(currentindex)
    but.src = "./icon/play.svg";
  playtrack();
  })
 //function for get random track index
  function getrandomtrackindex(currentindex,length){
let randomindex;
  do{
    randomindex=Math.floor(Math.random()*length)
}    while(randomindex===currentindex)
   return randomindex;
  };

function playtrack(){
  audiosrc.src=musiclist[currentindex].music;
  artist.innerText=musiclist[currentindex].artist;
  coverimg.src=musiclist[currentindex].cover;
  if(!audiosrc.paused){
    audiosrc.play();
  }
}
  let currentindex = 0;
  // function to update time duration of music track
  function updateDuration() {
    let duem = Math.floor(audiosrc.duration / 60);
    let dues = Math.floor(audiosrc.duration % 60);
    due.innerText = `${String(duem).padStart(2, "0")}:${String(dues).padStart(2,"0"
    )}`;
    ctime.innerText = "00:00";
  }

  // function for get music stuff form array of objects
  function setaudiosrc(index) {
    audiosrc.src = musiclist[index].music;
    artist.innerText = musiclist[index].artist;
    coverimg.src = musiclist[index].cover;
    audiosrc.onloadedmetadata = updateDuration;
    audiosrc.load();
  }

  //play paused function for pp button
  but.onclick = function pp() {
    if (audiosrc.paused) {
      audiosrc.play();
      coverimg.classList.add("animateimg");
      but.src = "./icon/pause-svgrepo-com.svg";
    } else {
      but.src = "./icon/play.svg";
      audiosrc.pause();
      coverimg.classList.remove("animateimg");
    }
  };

  audiosrc.addEventListener("timeupdate", function () {
    let provalue = (audiosrc.currentTime / audiosrc.duration) * 100;
    range.value = provalue;
    let ctimem = Math.floor(audiosrc.currentTime / 60);
    let ctimes = Math.floor(audiosrc.currentTime % 60);
    ctime.innerText = `${String(ctimem).padStart(2, "0")}:${String(ctimes
    ).padStart(2, "0")}`;
  });
  

  // function for update value of music according to range
  range.addEventListener("input", function () {
    let newvalue = range.value;
    let duration = audiosrc.duration;
    audiosrc.currentTime = (newvalue / 100) * duration;
  });

  audiosrc.addEventListener("ended", function () {
    coverimg.classList.remove("animateimg");
    but.src = "./icon/play.svg";
  });

  //function for next button
  next.onclick = function () {
    currentindex = (currentindex + 1) % musiclist.length;
    setaudiosrc(currentindex);
    coverimg.classList.remove("animateimg");
    but.src = "./icon/play.svg";
    playtrack()
  };

  //function for previous music
  previous.onclick = function () {
    currentindex--;
    if (currentindex < 0) {
      currentindex = musiclist.length - 1;
    }
    setaudiosrc(currentindex);
    coverimg.classList.remove("animateimg");
    but.src = "./icon/play.svg";
    playtrack()
  }
//function for repeat music
  repeat.addEventListener("click",function () {
    audiosrc.loop=audiosrc.loop ? false: true
  })
  setaudiosrc(currentindex);
});
