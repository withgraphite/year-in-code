// parity with devicons
export const getLanguage = (lang: string) => {
	const l = lang.toLowerCase()
	switch (l) {
		case 'vim script':
			return 'vim'
		default:
			return l
	}
}
