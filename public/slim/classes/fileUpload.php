<?php
/**
 * Created by PhpStorm.
 * User: user1
 * Date: 17.1.2016
 * Time: 00:29
 */

namespace fileUpload;

class fileUpload {

    private $watermark = false;
    private $thumb_creating = false;
    private $messages = array(
        'uploadTargetUndefined' => 'Upload hedefi tanımsız',
        'fileTypeError' => 'Yüklenmek istenen dosya tipi uyumsuz !'
    );

    function __construct($upload_target, $watermark_text = NULL, $fitTo = NULL)
    {
        if (is_null($upload_target)) exit($this->messages['uploadTargetUndefined']);

        define('upload_target', $upload_target);

        if (!is_null($watermark_text)) {

            define('watermark_text', $watermark_text);
            define('font_size', 35);
            $this->watermark = true;

            $this->thumb_creating = false; // also creating by watermark
        }

        if (!is_null($fitTo)) {
            define('fitTo', 800);
        }

    }

    /*
	Upload directory
	$_FILES => $files = $_FILES
	*/
    public function upload_file($files = NULL, $new_name = true) {

        if ($files != NULL and is_array($files)) {

            $return = array();

            foreach ($files as $root => $file) {

                //foreach($file['name'] as $key => $value) {

                if ($file->getError() != 4) {

                    //if ($this->max_file_size($file['size'][$key])) {

                    $ext = $this->allowed_file_types($file->getClientMediaType());

                    if ($ext !== false) {

                        $new_name_of_image = ($new_name == true) ?
                            $this->create_file_name(upload_target, $ext) :
                            $this->check_file_exists(upload_target, $file->getClientFilename);


                        /* Watermark codes start */
                        if ($this->watermark)
                            $result = $this->addWatermark($file, watermark_text, $new_name_of_image);
                        /* Watermark codes end */
                        else
                            $result = $file->moveTo(upload_target . $new_name_of_image);

                        /*$result = move_uploaded_file(
                            $file['tmp_name'],
                            upload_target . $new_name_of_image);*/

                        if ($result === true) {

                            // thumb creating
                            if ($this->thumb_creating) {

                                list($sw, $sh, $type) = getimagesize(upload_target . $new_name_of_image);
                                $this->createThumb(
                                    upload_target . $new_name_of_image,
                                    $sw,
                                    $sh,
                                    $new_name_of_image, $type);

                            }

                            $return = array(
                                true,
                                $new_name_of_image
                            );
                        }

                    } else {
                        $return = $this->messages['fileTypeError'];
                    }
                }
            }

            return $return;

        } else {

            return false;
        }
    }

    /*
     * Create a new file name
    */
    private function create_file_name($target, $ext)
    {

        $new_name = $this->random_name(10) . $ext;

        if (!file_exists($target . $new_name)) {

            return $new_name;

        } else
            $this->create_file_name($target, $ext);
    }

    /*
    Check file name if exists add datetime before file name
    */
    private function check_file_exists($target, $dosya)
    {

        if (!file_exists($target . $dosya)) {

            return $dosya;
        } else
            return date("YmdHis") . $dosya;
    }

    /*
    Allowed file types
    */
    private function allowed_file_types($type)
    {

        $allowed_types = array(
            "image/jpeg" => ".jpg",
            "image/png" => ".png"
            /*            "image/gif" => ".gif",
                        "image/bmp" => ".bmp",
                        "application/msword" => ".doc",
                        "application/vnd.ms-excel" => ".xls",
                        "application/pdf" => ".pdf",
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" => ".docx",
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" => ".xlsx"*/
        );

        if (array_key_exists($type, $allowed_types)) {
            return $allowed_types[$type];
        } else {
            return false;
        }
    }

    /*
    Allowed max file size
    */
    private function max_file_size($size)
    {
        $max = 5242880; // 5mb max

        if ($size <= $max)
            return true;
        else
            return false;
    }

    /*
    Random string
    */
    private function random_name($max)
    {
        $i = 0; //Reset the counter.
        $possible_keys = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $keys_length = strlen($possible_keys);
        $str = ""; //Let's declare the string, to add later.
        while ($i < $max) {
            $rand = mt_rand(1, $keys_length - 1);
            $str .= $possible_keys[$rand];
            $i++;
        }
        return $str;
    }

    /*
    Return an icon by mime type
    */
    private function file_type_icon($file)
    {

        $type = mime_content_type($file);

        $types = array(
            "image/jpeg" => "jpg",
            "image/png" => "png"
            /*"application/msword" => "doc",
            "application/vnd.ms-excel" => "xls",
            "application/pdf" => "pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" => "doc",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" => "xls"*/
        );

        if (array_key_exists($type, $types)) {
            return $types[$type];
        } else {
            return "tmp";
        }
    }


    /*
    Append transparent watermark to the image
    */
    private function addWatermark($img, $watermark, $new_name)
    {

        $font_path = "../../fonts/arial.ttf"; // Font file

        $old_image_tmp = $img['tmp_name'];

        list($owidth, $oheight, $type) = getimagesize($old_image_tmp);

        $aspect = $this->aspectRatio($owidth, $oheight);
        $width = $aspect["width"];
        $height = $aspect["height"];

        switch ($type) {
            case IMAGETYPE_JPEG:
                $image_src = imagecreatefromjpeg($old_image_tmp);
                break;
            case IMAGETYPE_PNG:
                $image_src = imagecreatefrompng($old_image_tmp);
                break;
            case IMAGETYPE_GIF:
                $image_src = imagecreatefromgif($old_image_tmp);
                break;
            default:
                exit("Bilinmeyen format");
        }

        $image = imagecreatetruecolor($width, $height);


        imagecopyresampled($image, $image_src, 0, 0, 0, 0, $width, $height, $owidth, $oheight);

        $color = imagecolorallocatealpha($image, 238, 238, 238, 50);

        //$wmX = ($width / 2);
        //$wmY = $height - 50;
        //$wmY = ($height / 2) - $font_size;
        $angle = 0;

        $box = imagettfbbox(font_size, $angle, $font_path, $watermark);

        $wmX = $box[0] + (imagesx($image) / 2) - ($box[4] / 2) + 10;
        $wmY = $box[1] + (imagesy($image) / 2) - ($box[5] / 2) - 5;

        imagettftext($image, font_size, $angle, $wmX, $wmY, $color, $font_path, $watermark);

        switch ($type) {
            case IMAGETYPE_JPEG:
                imagejpeg($image, upload_target . $new_name, 100);
                break;
            case IMAGETYPE_PNG:
                imagepng($image, upload_target . $new_name, 2);
                break;
            case IMAGETYPE_GIF:
                imagegif($image, upload_target . $new_name, 100);
                break;
            default:
                exit("Bilinmeyen format");
        }

        $this->createThumb($image, $width, $height, $new_name, $type);

        imagedestroy($image);
        unlink($old_image_tmp);

        return true;
    }

    /*
    Aspect ratio image resize
    */
    private function aspectRatio($sw, $sh)
    {
        $return = array("width" => $sw, "height" => $sh);

        if ($sw > fitTo) {

            $ratio = $sw / $sh;

            if ($ratio > 1) {

                $nw = fitTo;
                $nh = abs(fitTo / $ratio);

            } else {

                $nh = fitTo;
                $nw = abs($ratio * fitTo);
            }

            $return['width'] = $nw;
            $return['height'] = $nh;
        }

        return $return;

    }

    /*
    Create thumbnail image
    */
    private function createThumb($si, $sw, $sh, $name, $type)
    {
        $tw = 150;
        $th = 100;

        $sRatio = $sw / $sh;
        $tRatio = $tw / $th;

        if ($sRatio < $tRatio)
            $scale = $sw / $tw;
        else
            $scale = $sh / $th;

        $reW = abs($sw / $scale);
        $reH = abs($sh / $scale);

        $cropL = abs((($reW - $tw) / 2));
        $cropT = abs((($reH - $th) / 2));

        //var_dump($reW, $reH, $cropL, $cropT);

        $first_crop = array("x" => 0, "y" => 0, "width" => $reW, "height" => $reH);
        $last_crop = array("x" => $cropL, "y" => $cropT, "width" => $tw, "height" => $th);

        // GD works
        $im_first = imagecreatetruecolor($reW, $reH);
        imagecopyresampled($im_first, $si, 0, 0, 0, 0, $reW, $reH, $sw, $sh);

        $image = imagecrop($im_first, $last_crop);

        switch ($type) {
            case IMAGETYPE_JPEG:
                imagejpeg($image, upload_target . 't_' . $name, 100);
                break;
            case IMAGETYPE_PNG:
                imagepng($image, upload_target . 't_' . $name, 2);
                break;
            case IMAGETYPE_GIF:
                imagegif($image, upload_target . 't_' . $name, 100);
                break;
            default:
                exit("Bilinmeyen format");
        }

        imagedestroy($image);
        imagedestroy($im_first);
    }
}