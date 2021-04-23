document.querySelector("#start_chat").addEventListener("click", (event) => {
  const socket = io()

  const chat_help = document.getElementById("chat_help")
  chat_help.style.display = "none"

  const chat_in_support = document.getElementById("chat_in_support")
  chat_in_support.style.display = "block"

  const email = document.getElementById("email").value
  const text = document.getElementById("txt_help").value

  //Criando a rota para emitir o evento de conexão
  socket.on("connect", () => {
    const params = {
      email,
      text
    }
    //O socket.emit está emitindo um evento para o client_first_access lá do client.ts
    socket.emit("client-first-connection", params, (call, err) => {
      if (err) {
        console.err(err)
      }
      else {
        console.log(call)
      }
    })
  })
});
