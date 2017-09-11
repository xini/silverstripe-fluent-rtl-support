(function($) {
	$.entwine('ss', function($) {
		
		var setDirectionForLocale = function() {
			var locale = $.cookie('FluentLocale_CMS');
			if (typeof locale != 'undefined') {
				// get direction
				var dir = 'ltr';
				if (typeof fluentDirections != 'undefined' && locale in fluentDirections) {
					dir = fluentDirections[locale];
				}
				// set class on html tag
				$('html').removeClass('ltr').removeClass('rtl').addClass(dir);
				// update tinymce config
				if((typeof tinyMCE != 'undefined') && tinymce.activeEditor != null) {
					tinymce.activeEditor.directionality = dir;
					tinymce.activeEditor.getBody().setAttribute('dir', dir);
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