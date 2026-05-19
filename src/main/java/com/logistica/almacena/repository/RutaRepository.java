package com.logistica.almacena.repository;

import com.logistica.almacena.model.Ruta;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RutaRepository extends CassandraRepository<Ruta, UUID> {
}
