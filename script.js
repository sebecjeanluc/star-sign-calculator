document.addEventListener('DOMContentLoaded', function () {
	const form = document.querySelector('form')
	form.addEventListener('submit', function (event) {
		event.preventDefault()

		const name = document.getElementById('name').value
		const birthdate = document.getElementById('birthdate').value

		console.log('名前:', name)
		console.log('生年月日:', birthdate)

		if (!birthdate) {
			alert('生年月日を入力してください。')
			return
		}

		const birthDateObj = new Date(birthdate)
		const year = birthDateObj.getFullYear()
		const month = birthDateObj.getMonth() + 1 // JavaScriptの月は0から始まるので+1
		const day = birthDateObj.getDate()

		console.log('年:', year, '月:', month, '日:', day)

		const destinyNumber = calculateDestinyNumber(year, month, day)
		const rulingPlanet = determineRulingPlanet(destinyNumber, year)

		console.log('運命数:', destinyNumber)
		console.log('支配星:', rulingPlanet)

		document.getElementById(
			'result'
		).textContent = `あなたの支配星は「${rulingPlanet}」です。`
	})
})

function calculateDestinyNumber(year, month, day) {
	const yearMonthDestiny = destinyNumberData[year.toString()][month.toString()]
	let destinyNumber = yearMonthDestiny + day

	while (destinyNumber > 60) {
		destinyNumber -= 60
	}

	return destinyNumber
}

function determineRulingPlanet(destinyNumber, year) {
	const yearType = year % 2 === 0 ? 'even' : 'odd'
	const destinyRange = determineDestinyRange(destinyNumber)
	return rulingPlanetData[yearType][destinyRange]
}

function determineDestinyRange(destinyNumber) {
	if (destinyNumber === 0) return '0'
	for (let range in rulingPlanetData.even) {
		const [start, end] = range.split('-').map(Number)
		if (destinyNumber >= start && destinyNumber <= end) {
			return range
		}
	}
}
