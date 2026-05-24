package com.logistica.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions;
import org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import static org.springframework.cloud.gateway.server.mvc.filter.FilterFunctions.stripPrefix;
import static org.springframework.cloud.gateway.server.mvc.filter.BeforeFilterFunctions.uri;
import static org.springframework.cloud.gateway.server.mvc.predicate.GatewayRequestPredicates.path;

@SpringBootApplication
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

    @Bean
    public RouterFunction<ServerResponse> almacenBRoute() {
        return GatewayRouterFunctions.route("almacen-b")
                .route(path("/almacen-b/**"), HandlerFunctions.http())
                .before(uri("http://almacen-b:9092"))
                .filter(stripPrefix(1))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> almacenARoute() {
        return GatewayRouterFunctions.route("almacen-a")
                .route(path("/almacen-a/**"), HandlerFunctions.http())
                .before(uri("http://almacen-a:9091"))
                .filter(stripPrefix(1))
                .build();
    }
}
