import Flag from 'react-flagkit';

import { useLanguage } from '../hooks/useTranslation';

const LanguageSwitch = () => {
	const [language, setLanguage] = useLanguage();
	const changeLanguage = (lang: 'cs' | 'en') => {
		setLanguage(language !== lang ? lang : language);
	};
	return (
		<>
			<Flag
				country="GB"
				role="button"
				onClick={() => changeLanguage('en')}
				style={{
					filter: `saturate(${language === 'en' ? 0.1 : 1})`,
					cursor: `${language === 'en' ? '' : 'pointer'}`
				}}
			/>
			<Flag
				country="CZ"
				role="button"
				onClick={() => changeLanguage('cs')}
				style={{
					filter: `saturate(${language === 'cs' ? 0.1 : 1})`,
					cursor: `${language === 'cs' ? '' : 'pointer'}`
				}}
			/>
		</>
	);
};

export default LanguageSwitch;
