import { getDownloadURL } from '@firebase/storage';
import { useEffect, useState } from 'react';

import { appImageRef } from '../utils/firebase';

const useAppImage = (url: string) => {
	const [imageSrc, setImageSrc] = useState(
		'https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png'
	);
	useEffect(() => {
		getDownloadURL(appImageRef(url)).then(url => {
			setImageSrc(url);
		});
	}, []);

	return imageSrc;
};

export default useAppImage;
