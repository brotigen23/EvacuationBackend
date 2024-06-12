package org.ivkrylov.EvacuationBackend.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {
    @GetMapping("/")
    public String getIndex(){
        return "pages/map/map";
    }

    @GetMapping("/map")
    public String map(){
        return "pages/map/map";
    }
}
