export const requestPermission = () => {
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification")
  } else {
    Notification.requestPermission()
  }
}

export const showNotification = () => {
  if (!Notification.permission === 'granted') {
    this.requestPermission()
  }

  const options = {
    body: "Hola, qué tal?",
    icon: "../public/images/icons/icon-128x128.png",
    dir: "ltr"
  }
  const notification = new Notification("Notificación", options)
  console.log(notification.timestamp)
  setTimeout(() => {
    notification.close()
  }, 2000)
}