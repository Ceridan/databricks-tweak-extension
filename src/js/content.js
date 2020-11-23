let jobListFilter = ''

function sortJobsByDesc() {
  const columns = Array.from(document.querySelectorAll('a.header-cell'))
  const jobColumn = columns.filter((column) => column.innerText === 'Job ID')[0]
  jobColumn.click()
  jobColumn.click()
}

function restoreFilterValue() {
  const filter = document.getElementById('input')

  if (!filter.value && jobListFilter) {
    filter.value = jobListFilter
    filter.dispatchEvent(new Event('input', { bubbles: true }))
  }

  filter.addEventListener('input', () => {
    jobListFilter = filter.value
  })
}

function locationHashChanged() {
  if (document.location.hash.startsWith('#joblist')) {
    const timerId = setInterval(() => {
      if (document.getElementsByClassName('job-list-table')[0] !== undefined) {
        clearInterval(timerId)
        restoreFilterValue()
        sortJobsByDesc()
      }
    }, 1000)
  }
}

window.addEventListener('load', locationHashChanged)
window.addEventListener('hashchange', locationHashChanged)
