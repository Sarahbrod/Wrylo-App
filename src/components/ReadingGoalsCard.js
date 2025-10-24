import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ReadingGoalsCard = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showQuantitativeModal, setShowQuantitativeModal] = useState(false);
  const [showGeographicModal, setShowGeographicModal] = useState(false);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [newGoalType, setNewGoalType] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalTitle, setNewGoalTitle] = useState('');

  // Reading goals state
  const [booksPerYear, setBooksPerYear] = useState(24);
  const [booksRead, setBooksRead] = useState(8);
  const [countriesGoal, setCountriesGoal] = useState(10);
  const [countriesRead, setCountriesRead] = useState(4);
  const [countriesList, setCountriesList] = useState(['USA', 'UK', 'Japan', 'France']);

  const quantitativeProgress = (booksRead / booksPerYear) * 100;
  const geographicProgress = (countriesRead / countriesGoal) * 100;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <LinearGradient
              colors={['#88A7E1', '#88A7E1']}
              style={styles.iconContainer}
            >
              <Ionicons name="book" size={24} color="#FFFFFF" />
            </LinearGradient>
            <View>
              <Text style={styles.title}>Reading Goals</Text>
              <Text style={styles.subtitle}>Track your progress</Text>
            </View>
          </View>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="#71727A"
          />
        </View>

        {isExpanded && (
          <View style={styles.expandedContent}>
            {/* Quantitative Goal */}
            <TouchableOpacity
              style={[styles.goalSection, { backgroundColor: '#E8F4F8' }]}
              onPress={() => setShowQuantitativeModal(true)}
            >
              <View style={styles.goalHeader}>
                <View style={styles.goalHeaderLeft}>
                  <Ionicons name="book" size={18} color="#481825" />
                  <Text style={styles.goalTitle}>Books This Year</Text>
                </View>
                <TouchableOpacity onPress={() => setShowQuantitativeModal(true)}>
                  <Ionicons name="settings-outline" size={18} color="#71727A" />
                </TouchableOpacity>
              </View>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <LinearGradient
                    colors={['#5B8DD6', '#3A78CC']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.min(quantitativeProgress, 100)}%`,
                      }
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {booksRead} of {booksPerYear} books
                </Text>
              </View>
            </TouchableOpacity>

            {/* Geographic Diversity Goal */}
            <TouchableOpacity
              style={[styles.goalSection, { backgroundColor: '#F0E8FF' }]}
              onPress={() => setShowGeographicModal(true)}
            >
              <View style={styles.goalHeader}>
                <View style={styles.goalHeaderLeft}>
                  <Ionicons name="globe" size={18} color="#7B5FA7" />
                  <Text style={styles.goalTitle}>Geographic Diversity</Text>
                </View>
                <TouchableOpacity onPress={() => setShowGeographicModal(true)}>
                  <Ionicons name="settings-outline" size={18} color="#71727A" />
                </TouchableOpacity>
              </View>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <LinearGradient
                    colors={['#A78BFA', '#7B5FA7']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.min(geographicProgress, 100)}%`,
                      }
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {countriesRead} of {countriesGoal} countries
                </Text>
              </View>
              {countriesList.length > 0 && (
                <View style={styles.countriesContainer}>
                  {countriesList.map((country, index) => (
                    <View key={index} style={styles.countryBadge}>
                      <Text style={styles.countryText}>{country}</Text>
                    </View>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          </View>
        )}

        {isExpanded && (
          <TouchableOpacity
            style={styles.addGoalButton}
            onPress={() => setShowAddGoalModal(true)}
          >
            <Ionicons name="add-circle" size={20} color="#FFFFFF" />
            <Text style={styles.addGoalButtonText}>Add Goal</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      {/* Quantitative Goal Modal */}
      <Modal
        visible={showQuantitativeModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowQuantitativeModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowQuantitativeModal(false)}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <Text style={styles.modalTitle}>Set Reading Goal</Text>
            <Text style={styles.modalSubtitle}>How many books do you want to read this year?</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={booksPerYear.toString()}
                onChangeText={(text) => setBooksPerYear(parseInt(text) || 0)}
                keyboardType="number-pad"
                placeholder="24"
              />
              <Text style={styles.inputLabel}>books/year</Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowQuantitativeModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={() => setShowQuantitativeModal(false)}
              >
                <Text style={styles.saveButtonText}>Save Goal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Geographic Goal Modal */}
      <Modal
        visible={showGeographicModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowGeographicModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowGeographicModal(false)}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <Text style={styles.modalTitle}>Geographic Diversity</Text>
            <Text style={styles.modalSubtitle}>How many different countries do you want to explore?</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={countriesGoal.toString()}
                onChangeText={(text) => setCountriesGoal(parseInt(text) || 0)}
                keyboardType="number-pad"
                placeholder="10"
              />
              <Text style={styles.inputLabel}>countries</Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowGeographicModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={() => setShowGeographicModal(false)}
              >
                <Text style={styles.saveButtonText}>Save Goal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Add New Goal Modal */}
      <Modal
        visible={showAddGoalModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddGoalModal(false)}
      >
        <View style={styles.fullScreenModalOverlay}>
          <View style={styles.addGoalModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New Goal</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowAddGoalModal(false);
                  setNewGoalType('');
                  setNewGoalTitle('');
                  setNewGoalTarget('');
                }}
                style={styles.closeButton}
              >
                <Ionicons name="close-circle" size={28} color="#71727A" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalDescription}>
              Set a reading goal to track your progress and stay motivated
            </Text>

            <View style={styles.formSection}>
              <Text style={styles.formLabel}>
                <Ionicons name="list" size={16} color="#481825" /> Goal Type
              </Text>
              <View style={styles.goalTypeOptions}>
                <TouchableOpacity
                  style={[
                    styles.goalTypeButton,
                    newGoalType === 'quantitative' && styles.goalTypeButtonActive
                  ]}
                  onPress={() => setNewGoalType('quantitative')}
                >
                  <Ionicons
                    name="book"
                    size={24}
                    color={newGoalType === 'quantitative' ? '#FFFFFF' : '#481825'}
                  />
                  <Text style={[
                    styles.goalTypeButtonText,
                    newGoalType === 'quantitative' && styles.goalTypeButtonTextActive
                  ]}>
                    Quantitative
                  </Text>
                  <Text style={[
                    styles.goalTypeDesc,
                    newGoalType === 'quantitative' && styles.goalTypeDescActive
                  ]}>
                    Number-based goals
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.goalTypeButton,
                    newGoalType === 'qualitative' && styles.goalTypeButtonActive
                  ]}
                  onPress={() => setNewGoalType('qualitative')}
                >
                  <Ionicons
                    name="star"
                    size={24}
                    color={newGoalType === 'qualitative' ? '#FFFFFF' : '#481825'}
                  />
                  <Text style={[
                    styles.goalTypeButtonText,
                    newGoalType === 'qualitative' && styles.goalTypeButtonTextActive
                  ]}>
                    Qualitative
                  </Text>
                  <Text style={[
                    styles.goalTypeDesc,
                    newGoalType === 'qualitative' && styles.goalTypeDescActive
                  ]}>
                    Experience-based goals
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.formSection}>
              <Text style={styles.formLabel}>
                <Ionicons name="create" size={16} color="#481825" /> Goal Name
              </Text>
              <TextInput
                style={styles.formInput}
                value={newGoalTitle}
                onChangeText={setNewGoalTitle}
                placeholder="e.g., Read more classics"
                placeholderTextColor="#B0B0B0"
                autoCapitalize="sentences"
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.formLabel}>
                <Ionicons name="trending-up" size={16} color="#481825" /> Target Number
              </Text>
              <TextInput
                style={styles.formInput}
                value={newGoalTarget}
                onChangeText={setNewGoalTarget}
                placeholder="e.g., 10"
                keyboardType="number-pad"
                placeholderTextColor="#B0B0B0"
              />
            </View>

            <View style={styles.modalButtonsFullScreen}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowAddGoalModal(false);
                  setNewGoalType('');
                  setNewGoalTitle('');
                  setNewGoalTarget('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.createButton,
                  (!newGoalType || !newGoalTitle || !newGoalTarget) && styles.createButtonDisabled
                ]}
                onPress={() => {
                  if (newGoalType && newGoalTitle && newGoalTarget) {
                    // Handle goal creation here
                    console.log('Creating goal:', { newGoalType, newGoalTitle, newGoalTarget });
                    setShowAddGoalModal(false);
                    setNewGoalType('');
                    setNewGoalTitle('');
                    setNewGoalTarget('');
                  }
                }}
                disabled={!newGoalType || !newGoalTitle || !newGoalTarget}
              >
                <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                <Text style={styles.createButtonText}>Create Goal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E0A09',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: '#71727A',
  },
  expandedContent: {
    marginTop: 24,
    gap: 20,
  },
  goalSection: {
    padding: 16,
    backgroundColor: '#F6F4F1',
    borderRadius: 12,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  goalTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2E0A09',
  },
  progressContainer: {
    gap: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2E0A09',
  },
  countriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  countryBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A78BFA',
  },
  countryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7B5FA7',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E0A09',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#71727A',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#F6F4F1',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 24,
    fontWeight: '700',
    color: '#2E0A09',
    textAlign: 'center',
    minWidth: 80,
  },
  inputLabel: {
    fontSize: 16,
    color: '#71727A',
    fontWeight: '500',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F6F4F1',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#71727A',
  },
  saveButton: {
    backgroundColor: '#5B8DD6',
    shadowColor: '#5B8DD6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  addGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#481825',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
    shadowColor: '#481825',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addGoalButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  fullScreenModalOverlay: {
    flex: 1,
    backgroundColor: '#F6F4F1',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  addGoalModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  closeButton: {
    padding: 4,
  },
  modalDescription: {
    fontSize: 14,
    color: '#71727A',
    marginBottom: 32,
    lineHeight: 20,
  },
  formSection: {
    marginBottom: 28,
  },
  formLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#481825',
    marginBottom: 14,
    letterSpacing: 0.2,
  },
  formInput: {
    backgroundColor: '#F6F4F1',
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 14,
    fontSize: 16,
    color: '#2E0A09',
    borderWidth: 2,
    borderColor: '#E8E8E8',
    fontWeight: '500',
  },
  goalTypeOptions: {
    flexDirection: 'row',
    gap: 14,
  },
  goalTypeButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#F6F4F1',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 2.5,
    borderColor: '#E8E8E8',
    minHeight: 120,
  },
  goalTypeButtonActive: {
    backgroundColor: '#481825',
    borderColor: '#481825',
    shadowColor: '#481825',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  goalTypeButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#481825',
    textAlign: 'center',
  },
  goalTypeButtonTextActive: {
    color: '#FFFFFF',
  },
  goalTypeDesc: {
    fontSize: 12,
    color: '#71727A',
    textAlign: 'center',
    fontWeight: '500',
  },
  goalTypeDescActive: {
    color: '#F6F4F1',
    opacity: 0.9,
  },
  modalButtonsFullScreen: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 8,
  },
  createButton: {
    backgroundColor: '#481825',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#481825',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
});

export default ReadingGoalsCard;
