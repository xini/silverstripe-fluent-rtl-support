<?php

/**
 * Fluent RTL extension for main CMS admin
 *
 * @see LeftAndMain
 * @package fluent-rtl-support
 * @author Florian Thoma
 */
class FluentRTLLeftAndMain extends LeftAndMainExtension
{
    public function init()
    {
        $dirName = basename(dirname(dirname(dirname(__FILE__))));
        
        $directions = array();
        foreach (Fluent::locales() as $locale) {
            $directions[$locale] = i18n::get_script_direction($locale);
        }
        
        $jsDirections = json_encode($directions);
        
        // Force the variables to be written to the head, to ensure these are available for other scripts to pick up.
        Requirements::insertHeadTags(<<<EOT
<script type="text/javascript">
//<![CDATA[
	var fluentDirections = $jsDirections;
//]]>
</script>
EOT
            , 'FluentRTLHeadScript'
        );
        Requirements::javascript("$dirName/javascript/fluent-rtl.js");
        Requirements::css("$dirName/css/fluent-rtl.css");
    }
}
