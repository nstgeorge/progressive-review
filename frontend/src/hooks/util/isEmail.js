export default (email) => {
  return /.+@.+\..+/.test(email)
}