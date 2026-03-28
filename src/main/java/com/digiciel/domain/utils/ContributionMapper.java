package com.digiciel.domain.utils;

import com.digiciel.domain.model.Contribution;
import com.digiciel.infrastructure.entity.ContributionEntity;

import jakarta.enterprise.context.ApplicationScoped;

/**
 * Mapper converted to CDI bean for easier injection and testability.
 */
@ApplicationScoped
public class ContributionMapper {
  public Contribution toContribution(final ContributionEntity entity) {
    if (entity == null) {
      return null;
    }

    Contribution dto = new Contribution();
    dto.setId(entity.getId());
    dto.setDate(entity.getDate());
    dto.setAmount(entity.getAmount());
    dto.setBeneficiary(entity.getBeneficiary());
    dto.setDonor(entity.getDonor());
    dto.setDateModication(entity.getDateModication());
    dto.setDescription(entity.getDescription());
    dto.setCategory(entity.getCategory());
    return dto;
  }

  public ContributionEntity toContributionEntity(final Contribution dto) {
    if (dto == null) {
      return null;
    }

    ContributionEntity entity = new ContributionEntity();
    boolean isZeroId = dto.getId() == null || dto.getId().longValue() == 0;
    if (!isZeroId) {
      entity.setId(dto.getId());
    }

    entity.setDate(dto.getDate());
    entity.setAmount(dto.getAmount());
    entity.setBeneficiary(dto.getBeneficiary());
    entity.setDonor(dto.getDonor());
    entity.setDateModication(dto.getDateModication());
    entity.setDescription(dto.getDescription());
    entity.setCategory(dto.getCategory());
    return entity;
  }
}