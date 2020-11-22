function sortJobsByDesc() {
  const columns = Array.from(document.querySelectorAll('a.header-cell'))
  const jobColumn = columns.filter((column) => column.innerText === 'Job ID')[0]
  jobColumn.click()
  jobColumn.click()
}

function locationHashChanged() {
  if (document.location.hash.startsWith('#joblist')) {
    const timerId = setInterval(() => {
      if (document.getElementsByClassName('job-list-table')[0] !== undefined) {
        clearInterval(timerId)
        sortJobsByDesc()
      }
    }, 1000)
  }
}

window.addEventListener('load', locationHashChanged)
window.addEventListener('hashchange', locationHashChanged)
