package com.logistica.almacenb.controller;

import com.logistica.almacenb.model.Ruta;
import com.logistica.almacenb.service.RutaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rutas")
@RequiredArgsConstructor
public class RutaController {

    private final RutaService rutaService;

    @GetMapping
    public ResponseEntity<List<Ruta>> obtenerTodas() {
        return ResponseEntity.ok(rutaService.obtenerTodas());
    }

    @GetMapping("/optimizadas")
    public ResponseEntity<List<Ruta>> obtenerOptimizadas() {
        return ResponseEntity.ok(rutaService.obtenerRutasOptimizadas());
    }

    @PostMapping
    public ResponseEntity<Ruta> crearRuta(@RequestBody Ruta ruta) {
        return ResponseEntity.ok(rutaService.guardarRuta(ruta));
    }
}
