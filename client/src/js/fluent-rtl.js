(function($) {
	$.entwine('ss', function($) {
		
		var fluentRTLConfig = function() {
			var section = 'SilverStripe\\Admin\\LeftAndMain';
			if (window
				&& window.ss
			    && window.ss.config
			    && window.ss.config.sections
			) {
				var config = window.ss.config.sections.find(function (next) {
					return next.name === section;
				});
			    if (config) {
			    	return config.fluentrtl || {};
			    }
			}
			return {};
		};		
		
		var setDirectionForLocale = function() {
			var currentLocale = $.cookie('FluentLocale_CMS');
			if (typeof currentLocale != 'undefined') {
				var config = fluentRTLConfig();
				// Skip if no locales defined
				if (typeof config.locales === 'undefined' || config.locales.length === 0) {
					return;
				}
				// get direction
				var dir = 'ltr';
				config.locales.forEach(function(locale) {
					if (locale.code == currentLocale) {
						dir = locale.dir;
					}
				});
				// set class on html tag
				$('html').removeClass('ltr').removeClass('rtl').addClass(dir);
				// update tinymce config
				if(typeof tinymce != 'undefined') {
					for (var i = 0; i < tinymce.editors.length; i++) {
						var editorInstance = tinymce.editors[i];
						var textArea = editorInstance.getElement();
						// check if editor is a localised field
						if (textArea.classList.contains('fluent__localised-field')) {
							// add separator
							// set field direction
							editorInstance.directionality = dir;
							editorInstance.getBody().setAttribute('dir', dir);
						}
					}
				}
			}
		};
		
		$(".cms-fluent-selector").entwine({
			onmatch: function() {
				setDirectionForLocale();
			}
		});
		
		$(".cms-content").entwine({
			onmatch: function() {
				setDirectionForLocale();
			}
		});
		
		$(".field.htmleditor iframe").entwine({
			onmatch: function() {
				setDirectionForLocale();
			}
		});
		
	});
})(jQuery);