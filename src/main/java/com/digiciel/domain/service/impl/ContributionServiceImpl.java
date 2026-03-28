package com.digiciel.domain.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.digiciel.domain.model.Contribution;
import com.digiciel.domain.service.ContributionService;
import com.digiciel.domain.utils.ContributionMapper;
import com.digiciel.infrastructure.entity.ContributionEntity;
import com.digiciel.infrastructure.repository.ContributionRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

/**
 * @author jean-marie
 */
@ApplicationScoped
public class ContributionServiceImpl implements ContributionService {

  private ContributionRepository repository;
  private ContributionMapper mapper;

  @Inject
  public ContributionServiceImpl(final ContributionRepository repository, final ContributionMapper mapper) {
    this.repository = repository;
    this.mapper = mapper;
  }

  @Override
  public List<Contribution> getAll() {
    List<ContributionEntity> entities = repository.listAll();
    return entities.stream().map(mapper::toContribution).collect(Collectors.toList());
  }

  @Override
  public Contribution create(final Contribution domain) {
    if (domain == null) {
      throw new IllegalArgumentException("Contribution must not be null");
    }
    ContributionEntity entity = mapper.toContributionEntity(domain);
    // ensure creation date set
    if (entity.getDate() == null) {
      entity.setDate(LocalDateTime.now());
    }
    repository.persist(entity);
    return mapper.toContribution(entity);
  }

  @Override
  public Contribution update(final Contribution domain) {
    if (domain == null) {
      throw new IllegalArgumentException("Contribution must not be null");
    }
    if (domain.getId() == null) {
      throw new IllegalArgumentException("Contribution id must be provided for update");
    }

    ContributionEntity entity = repository.findById(domain.getId());
    if (entity == null) {
      throw new IllegalArgumentException("Contribution with id " + domain.getId() + " not found");
    }

    // update mutable fields
    entity.setDate(domain.getDate() != null ? domain.getDate() : entity.getDate());
    entity.setAmount(domain.getAmount());
    entity.setBeneficiary(domain.getBeneficiary());
    entity.setDescription(domain.getDescription());
    entity.setCategory(domain.getCategory());
    entity.setDateModication(LocalDateTime.now());
    entity.setDonor(domain.getDonor());

    return mapper.toContribution(entity);
  }

  @Override
  public Optional<Contribution> findById(final Long id) {
    if (id == null) {
      return Optional.empty();
    }
    ContributionEntity entity = repository.findById(id);
    Contribution domain = null;
    if (entity != null) {
      domain = mapper.toContribution(entity);
    }
    return Optional.ofNullable(domain);
  }

  @Override
  public void delete(final Long id) {
    if (id == null) {
      throw new IllegalArgumentException("id must not be null");
    }
    // ensure entity exists before deleting
    ContributionEntity entity = repository.findById(id);
    if (entity == null) {
      throw new IllegalArgumentException("Contribution with id " + id + " not found");
    }
    repository.deleteById(id);
  }
}