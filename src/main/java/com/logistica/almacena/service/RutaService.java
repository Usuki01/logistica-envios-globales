package com.logistica.almacena.service;

import com.logistica.almacena.model.Ruta;
import com.logistica.almacena.repository.RutaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RutaService {

    private final RutaRepository rutaRepository;

    // Programación funcional - obtener rutas ordenadas por distancia
    public List<Ruta> obtenerRutasOptimizadas() {
        return rutaRepository.findAll()
                .stream()
                .filter(ruta -> ruta.getEstado().equals("ACTIVA"))
                .sorted(Comparator.comparingDouble(Ruta::getDistanciaKm))
                .collect(Collectors.toList());
    }

    public Ruta guardarRuta(Ruta ruta) {
        return rutaRepository.save(ruta);
    }

    public List<Ruta> obtenerTodas() {
        return rutaRepository.findAll();
    }
}