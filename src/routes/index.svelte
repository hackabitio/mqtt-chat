<script context="module">
	export const prerender = true;
</script>

<script>
	import { goto } from '$app/navigation';

	const selectARoom = () => {
		roomName = roomName.replace(/\s+/g, '-').toLowerCase()
		goto(`/chat/${roomName}`)
	}

	let roomName = ''
	let btnDisabled = true
	$: btnDisabled = roomName === ''
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		Wellcome to<br />Mqtt Chat
	</h1>

	<h2>
		Select a chat room
	</h2>

	<form on:submit|preventDefault={selectARoom} action="" class="selectRoom">
		<input type="text" id="chatRoom" bind:value={roomName}>
		<button class="submit" disabled="{btnDisabled}">
			<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1.07143 8.18091H13.856L15.7129 10.0139L13.8564 11.8468H1.07143C0.477735 11.8468 0.000100963 11.355 0.000100963 10.7457V9.27844C-0.00184506 9.13583 0.024358 8.99425 0.0772053 8.86181C0.130053 8.72938 0.208503 8.60871 0.30805 8.50672C0.407598 8.40474 0.526282 8.32346 0.657286 8.26755C0.788289 8.21163 0.929032 8.18219 1.07143 8.18091V8.18091Z" fill="black"/>
				<path d="M10.9951 0.291194C11.0058 0.301476 11.0165 0.312205 11.0268 0.322935L19.6858 9.23417C19.8873 9.44264 20 9.72143 20 10.0116C20 10.3018 19.8873 10.5806 19.6858 10.789L11.0259 19.7047C10.931 19.8042 10.8175 19.8839 10.6918 19.9393C10.5661 19.9947 10.4307 20.0247 10.2934 20.0277C10.1561 20.0306 10.0195 20.0063 9.89162 19.9563C9.76369 19.9062 9.64689 19.8314 9.5479 19.736C9.53719 19.7262 9.52692 19.7155 9.51665 19.7047L8.5288 18.6868C8.32565 18.4745 8.21373 18.1908 8.21707 17.8968C8.22041 17.6027 8.33874 17.3217 8.54665 17.114L15.7214 10.0138L8.54665 2.91454C8.33671 2.70798 8.21698 2.42657 8.21363 2.13185C8.21029 1.83713 8.3236 1.55307 8.5288 1.34178L9.51754 0.323382C9.61236 0.223944 9.72582 0.144216 9.85145 0.0887675C9.97708 0.0333185 10.1124 0.00323727 10.2496 0.000247209C10.3869 -0.00274286 10.5234 0.0214169 10.6513 0.0713424C10.7792 0.121268 10.896 0.195978 10.9951 0.291194V0.291194Z" fill="black"/>
			</svg>
		</button>
	</form>

</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	#chatRoom {
		padding: 15px;
		width: 100%;
		border: 1px solid rgba(0,0,0,0.2);
		border-radius: 8px;
	}

	.selectRoom {
		position: relative;
		width: 100%;
		max-width: 700px;
	}

	.submit {
		position: absolute;
		display: inline-block;
		top: 2px;
		right: 2px;
		bottom: 2px;
		width: 100px;
		border: inherit;
		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;

		&:not([disabled]) {
			cursor: pointer;

			&:hover {
				background-color: rgba(0,0,0,0.1);
			}
		}

	}
</style>
