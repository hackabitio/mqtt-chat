<script>
  import { page } from '$app/stores'
  import * as mqtt from 'mqtt/dist/mqtt.min'

  let notConnected = true
  let client
  let userName = ''
  let chatName = $page.params.chatName
  let btnDisabled = true
  $: btnDisabled = userName === ''
  let msgContent = ''
  let sendDisabled = true
  $: sendDisabled = msgContent === ''

  let allMsg = []

  const connectMqtt = () => {
    const options = {
      clean: true,
      connectTimeout: 4000,
      clientId: 'client' + userName,
      username: 'foad',
      password: 'foadyousefi'
    }
    const connectUrl = 'ws://mqtt.sendify.org:8081'
    client = mqtt.connect(connectUrl, options)

    client.on('connect', () => {
      client.subscribe('chat/' + chatName , err => {
        if (!err) {
          notConnected = false
          setTimeout(() => {
            document.getElementById('message').focus()
          }, 20)
          // client.publish('chat/' + chatName , JSON.stringify({message: 'Hello mqtt', userName}))
        }
      })
      client.on('message', (topic, message) => {
        message = JSON.parse(message.toString())
        allMsg = [...allMsg, message]
      })
    })

  }

  const publishMessage = () => {
    let msg = {
      message: msgContent,
      userName
    }
    client.publish('chat/' + chatName , JSON.stringify(msg))
    msgContent = ''
    document.getElementById('message').focus()
  }
</script>

<div class="set-user-name">
  <input type="text" id="userName" bind:value={userName}>
  <button class="connect" disabled="{btnDisabled}" on:click={connectMqtt}><span>Connect</span>
    <svg width="40" height="55" viewBox="0 0 40 55" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M36.6667 13.75H31.6667V1.71875C31.6667 1.26291 31.4911 0.825738 31.1785 0.50341C30.866 0.181082 30.442 0 30 0C29.558 0 29.134 0.181082 28.8215 0.50341C28.5089 0.825738 28.3333 1.26291 28.3333 1.71875V13.75H11.6667V1.71875C11.6667 1.26291 11.4911 0.825738 11.1785 0.50341C10.866 0.181082 10.442 0 10 0C9.55797 0 9.13405 0.181082 8.82149 0.50341C8.50893 0.825738 8.33333 1.26291 8.33333 1.71875V13.75H3.33333C2.44928 13.75 1.60143 14.1122 0.976311 14.7568C0.35119 15.4015 0 16.2758 0 17.1875L0 20.625C0 21.5367 0.35119 22.411 0.976311 23.0557C1.60143 23.7003 2.44928 24.0625 3.33333 24.0625V27.5C3.33333 36.3892 9.93438 43.6369 18.3333 44.5135V55H21.6667V44.5135C30.0656 43.6369 36.6667 36.3892 36.6667 27.5V24.0625C37.5507 24.0625 38.3986 23.7003 39.0237 23.0557C39.6488 22.411 40 21.5367 40 20.625V17.1875C40 16.2758 39.6488 15.4015 39.0237 14.7568C38.3986 14.1122 37.5507 13.75 36.6667 13.75V13.75ZM33.3333 27.5C33.3333 31.1467 31.9286 34.6441 29.4281 37.2227C26.9276 39.8013 23.5362 41.25 20 41.25C16.4638 41.25 13.0724 39.8013 10.5719 37.2227C8.07142 34.6441 6.66667 31.1467 6.66667 27.5V24.0625H33.3333V27.5ZM36.6667 20.625H3.33333V17.1875H36.6667V20.625Z" fill="black"/>
    </svg>
  </button>
</div>

<div class="messages {notConnected ? 'not-connected' : ''}">

  {#if allMsg.length }
    {#each allMsg as msg}
      <p><strong class="{userName == msg.userName? 'is-you' : ''}">{msg.userName}: </strong>{msg.message}</p>
    {/each}
  {/if}
</div>

<form class="message" on:submit|preventDefault={publishMessage}>
  <input type="text" id="message" bind:value={msgContent} disabled="{notConnected}" autocomplete="off">
  <button class="connect" disabled="{sendDisabled}"><span>Send</span>
    <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27.89 0.1893L0.731833 15.8573C-0.328714 16.4666 -0.193948 17.9432 0.860739 18.3885L7.08925 21.0018L23.9232 6.16586C24.2455 5.87875 24.7025 6.31821 24.4271 6.65219L10.3119 23.8495V28.5663C10.3119 29.9491 11.9818 30.494 12.8021 29.492L16.5228 24.9627L23.8236 28.0213C24.6557 28.3729 25.6049 27.8514 25.7572 26.9549L29.976 1.64243C30.1752 0.458832 28.9037 -0.396637 27.89 0.1893Z" fill="black"/>
    </svg>
  </button>
</form>


<style lang="scss">
  .set-user-name,
  .message {
    display: flex;
    max-height: 40px;

    input {
      flex: 5;
      padding-left: 20px;
    }

    button {
      flex: 1;
    }
    .connect {
      display: flex;
      align-items: center;
      justify-content: space-around;
      background-color: teal;
      color: white;

      &:not([disabled]) {
        cursor: pointer;

        &:hover {
          background-color: lighten(teal, 10);
        }
      }

      span {
        font-size: 20px;
      }

      svg {
        width: 20px;

        path {
          fill: white;
        }
      }
    }
  }

  .messages {
    border: 1px solid teal;
    width: 100%;
    min-height: 200px;
    height: 40vh;
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 10px;
    overflow: scroll;

    &.not-connected {
      background-color: #EEE;
    }

    p {
      margin: 0;
    }

    .is-you {
      color: teal;
    }
  }

</style>
