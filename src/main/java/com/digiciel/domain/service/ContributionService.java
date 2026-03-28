package com.digiciel.domain.service;

import java.util.List;
import java.util.Optional;

import com.digiciel.domain.model.Contribution;

/**
 * @author jean-marie
 */
public interface ContributionService {
  List<Contribution> getAll();

  Contribution create(Contribution domain);

  Contribution update(Contribution domain);

  Optional<Contribution> findById(Long id);

  void delete(Long id);

}
