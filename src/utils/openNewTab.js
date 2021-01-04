export const openNewTab = (href) => {
  const newLink = window.document.createElement('a')

  newLink.setAttribute('href', href)
  newLink.setAttribute('target', '_blank')
  newLink.click()
}
