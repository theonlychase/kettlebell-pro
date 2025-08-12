export default defineEventHandler(async (event) => {
  try {
    setResponseStatus(event, 200)
  }
  catch (error) {
    return { error }
  }
})
