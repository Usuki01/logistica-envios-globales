package com.logistica.almacenb.model;

import lombok.Data;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.UUID;

@Data
@Table("rutas")
public class Ruta {

    @PrimaryKey
    private UUID id = UUID.randomUUID();

    private String origen;
    private String destino;

    @Column("distancia_km")
    private Double distanciaKm;

    private String estado;
}
