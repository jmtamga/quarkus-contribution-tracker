package com.digiciel.infrastructure.repository;

import com.digiciel.infrastructure.entity.ContributionEntity;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

/**
 * @author jean-marie
 */
@ApplicationScoped
public class ContributionRepository implements PanacheRepository<ContributionEntity> {
}
