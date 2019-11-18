<?php
/**
 * Created by PhpStorm.
 * User: user1
 * Date: 10.1.2016
 * Time: 02:09
 */

namespace basic;


class basic
{
    function __construct() {

        // Constant DB VARS
        /*define("dbN", "dnzpro");
        define("dbU", "dnzproadm");
        define("dbP", "/*96321");*/

        define("dbN", "gencproc_neriocms");
        define("dbU", "gencproc_nerioad");
        define("dbP", "/*96321nerio");

        define("table_navigation", "navigation", true);
        define("table_pages", "pages", true);
        define("table_productsCategories", "products_categories", true);
        define("table_productsMedia", "products_media", true);
        define("table_productsContents", "products_contents", true);
        define("table_productsPricing", "products_pricing", true);
        define("table_contacts", "contacts", true);
        define("table_contactDetails", "contact_details", true);
        define("table_contactForm", "contact_form", true);
        define("table_configs", "configs", true);
        define("table_sliders", "sliders", true);
        define("table_slidersCategories", "sliders_categories", true);
        define("table_videos", "videos", true);
        define("table_videosCategories", "videos_categories", true);
        define("table_boxes", "boxes", true);

        define("TABLES", [
           "table_pages" => "pages"
        ]);
        // constant vars
        //define("upload_target", "./uploads", true);
    }

    public function resolveTableName($name) {

        $tables = [
            "table_pages" => "pages",
            "table_navigation" => "navigation",
            "table_productsCategories" => "products_categories",
            "table_productsMedia" => "products_media",
            "table_productsContents" => "products_contents",
            "table_productsPricing" => "products_pricing",
            "table_contacts" => "contacts",
            "table_contactDetails" => "contact_details",
            "table_contactForm" => "contact_form",
            "table_configs" => "configs",
            "table_sliders" => "sliders",
            "table_slidersCategories" => "sliders_categories",
            "table_videos" => "videos",
            "table_videosCategories" => "videos_categories",
            "table_boxes" => "boxes"
        ];

        return $tables[$name];

    }

    /*
    İçerik gösterim alanı tanımlamaları
    unused
    */
    public function contentAreaDefinitions($key = NULL) {

        $r = array(
            1 => "İçerik",
            2 => "Footer",
            3 => "Kutu 2",
            4 => "Kutu 3"
        );

        if ($key != NULL)
            return $r[$key];
        else
            return $r;
    }

    /*
    Site configs listesi
    unused
    */
    public function siteConfigs($key = NULL) {

        $r = array(
            "siteTitle" => "Site Başlığı",
            "siteKeywords" => "Anahtar Kelimeler",
            "siteDescription" => "Site Tanıtımı",
            "baseHref" => "Base Href",
            "jsFramework" => "JS Framework",
            "cssFramework" => "CSS Framework",
            "scriptArea" => "Javascript Alanı",
            "favico" => "Favico"

        );

        if ($key != NULL)
            return $r[$key];
        else
            return $r;

    }

    public function ormAction($item) {

        if ($item->save()) {

            return json_encode($this->actionResultMessage("success"));

        } else {

            return json_encode($this->actionResultMessage("error"));
        }
    }
    /*
     *
    */
    private function actionResultMessage($type) {

        $ret = [];

        if ($type === "success") {

            $ret["title"] = "İşlem Başarılı";
            $ret["msg"] = "İşleminiz başarıyla tamamlandı.";
            $ret["type"] = "success";
            $ret["redirect"] = "";
            $ret["reload"] = true;
        }

        if ($type === "error") {

            $ret["title"] = "İşlem Başarısız";
            $ret["msg"] = "İşlem sırasında hata oluştu.";
            $ret["type"] = "error";
            $ret["redirect"] = "";
            $ret["reload"] = true;
        }

        return $ret;
    }

    /*
    Kullanıcı yetkileri tanımlamaları
    unused
    */
    public function userPermissions($key = NULL) {

        $r = array(
            1 => "Administrator",
            2 => "Kullanıcı"
        );

        if ($key != NULL)
            return $r[$key];
        else
            return $r;
    }

    /*
	Jquery alert box plugin
	*/
    public function alert($title, $msg = NULL, $type = "info", $redirTo = NULL) {

        /*
        type should be;
        "warning", "error", "success" and "info".
        */

        echo $script = '
		<script type="text/javascript" class="alert_script">
		    alertMe('.$title.','.$msg.','.$type.','.$redirTo.');
		</script>

		';
    }

}