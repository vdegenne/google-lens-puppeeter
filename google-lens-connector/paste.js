async function pasteContent() {
  try {
    const wizElement = document.querySelector('c-wiz')

    const clipboardItems = await navigator.clipboard.read()
    const firstItem = clipboardItems[0]
    const blob = await firstItem.getType('image/png')
    const file = new File([blob], 'image.png', { type: 'image/png' })

    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(file)

    const pasteEvent = new ClipboardEvent('paste', {
      bubbles: true,
      cancelable: true,
      clipboardData: dataTransfer,
    })

    wizElement.dispatchEvent(pasteEvent)
  }
  catch (e) { console.log(e) }
}