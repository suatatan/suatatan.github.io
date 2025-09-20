window.onload = function () {
  chrome.tabs.create({
    url: "https://suatatan.com/apps/breathing-exercise.html?lang=en"
  });
  window.close();
};
