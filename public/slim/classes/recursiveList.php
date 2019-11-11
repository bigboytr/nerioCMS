<?php
/**
 * Created by PhpStorm.
 * User: user1
 * Date: 15.1.2016
 * Time: 23:33
 */

namespace recursiveList;


class recursiveList
{
    private $return_this = null;
    public $navigasyon = null;

    /*
     This function convert list to level based list.
     For the menus, categories list and others.
     @return -> Array
     */
    public function recurList() {

        foreach($this->navigasyon as $key => $item) {

            if ($item->parent == 0) {

                $this->return_this[$item->id] = $this->clearArray($item);
                unset($this->navigasyon[$key]);
            }
        }

        foreach ($this->navigasyon as $key => $item) {

            $this->subLevel($key,$item);
        }

        // if still navigation var has item return to self.
        //if (count($this->navigasyon) > 0)
          //  $this->recurList();

        return $this->return_this;
    }

    /*
     * Add child menu items to the parent menu
     * Nothing return
     * Set local variable
     */
    private function subLevel($key,$item) {

        if (isset($this->return_this[$item->parent])) {

            $this->return_this[$item->parent]["child"][$item->id] = $this->clearArray($item);

            //unset($this->navigasyon[$key]);
        }
        else {

            foreach($this->return_this as $key2 => $array) {

                if (isset($array["child"])) {

                    $this->subLevel($key2, $array);
                }
            }
        }

    }

    /* create clear array for menu item */
    private function clearArray($item) {

        return array(
            "id" => $item->id,
            "title" => $item->title,
            "href" => $item->href,
            "active" => $item->active,
            "target" => $item->target,
            "menuOrder" => $item->menuOrder,
            "keywords" => $item->keyw,
            "description" => $item->desci,
            "type" => $item->type
        );
    }
}