import LazyLoadView from './LazyLoad.js';
import GalleryView from './Gallery.js';

import '../styles/styles.scss';

(function() {
	const container = document.querySelector('.container');

	if ( container ) {
		new LazyLoadView(container);
  	new GalleryView(container);
	}
}());