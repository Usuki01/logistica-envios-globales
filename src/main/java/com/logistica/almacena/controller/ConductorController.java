package com.logistica.almacena.controller;

import com.logistica.almacena.model.Conductor;
import com.logistica.almacena.repository.ConductorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/conductores")
@RequiredArgsConstructor
public class ConductorController {

    private final ConductorRepository conductorRepository;

    @GetMapping
    public ResponseEntity<List<Conductor>> obtenerTodos() {
        return ResponseEntity.ok(conductorRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Conductor> crearConductor(@RequestBody Conductor conductor) {
        return ResponseEntity.ok(conductorRepository.save(conductor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        conductorRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

