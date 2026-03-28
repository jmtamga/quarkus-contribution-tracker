package com.digiciel.common;

/**
 * @author jean-marie
 */
public enum ContributionCategory {
  /***/
  EDUCATION("Education des pauvres"),

  /***/
  HEALTH("Sante pour tous"),

  /***/
  ENVIRONMENT("Question environment"),

  /***/
  HUMANITARIEN("Aide humanitarian"),

  AIDE_SOCIALE("Aide sociale"),

  /***/
  OTHER("Autre");

  private final String libelle;

  private ContributionCategory(final String libelle) {
    this.libelle = libelle;
  }

  public String getLibelle() {
    return libelle;
  }
}
