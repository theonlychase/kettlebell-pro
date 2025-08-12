export function useInjectScript({
  src,
  id,
  async = true,
}: {
  src: string
  id: string
  async?: boolean
}): Promise<boolean> {
  const scriptEl = document.getElementById(id)

  return new Promise((resolve, reject) => {
    if (id && scriptEl) {
      return resolve(true)
    }
    const script = document.createElement('script')
    script.src = src
    script.type = 'text/javascript'
    script.async = async
    script.id = id

    document.body.appendChild(script)

    script.onload = () => resolve(true)
    script.onerror = e => reject(e)
  })
}
