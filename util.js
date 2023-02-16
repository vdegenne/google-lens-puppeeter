export async function wait(ms = 1000) {
  return new Promise(r => setTimeout(r, ms))
}
