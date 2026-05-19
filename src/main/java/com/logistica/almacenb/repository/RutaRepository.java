package com.logistica.almacenb.repository;

import com.logistica.almacenb.model.Ruta;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RutaRepository extends CassandraRepository<Ruta, UUID> {
}
