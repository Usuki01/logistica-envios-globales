package com.logistica.almacena.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "conductores")
public class Conductor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String licencia;
    private String telefono;
    private String estado;
}
