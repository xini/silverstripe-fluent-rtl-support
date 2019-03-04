<?php
namespace Innoweb\FluentRTLSupport\Extensions;

use SilverStripe\Admin\LeftAndMainExtension;
use SilverStripe\View\Requirements;
use TractorCow\Fluent\Model\Locale;
use SilverStripe\i18n\i18n;

class FluentRTLLeftAndMainExtension extends LeftAndMainExtension
{

    public function init()
    {
        Requirements::javascript('innoweb/silverstripe-fluent-rtl-support:client/dist/js/fluent-rtl.js');
        Requirements::css("innoweb/silverstripe-fluent-rtl-support:client/dist/css/fluent-rtl.css");
    }

    public function updateClientConfig(&$config)
    {
        $config = array_merge($config, [
            'fluentrtl' => [
                'locales' => array_map(function (Locale $locale) {
                    return [
                        'code' => $locale->getLocale(),
                        'dir' => i18n::get_script_direction($locale->getLocale())
                    ];
                }, Locale::getCached()->toArray()),
            ]
        ]);
    }
}
