import os

def compare_folders(folder1, folder2):
    try:
        # Get the list of files in both directories
        folder1_files = set(os.listdir(folder1))  # Set of files in the first folder
        folder2_files = set(os.listdir(folder2))  # Set of files in the second folder

        # Compare the files
        only_in_folder1 = folder1_files - folder2_files
        only_in_folder2 = folder2_files - folder1_files
        common_in_both = folder1_files & folder2_files

        # Output the results
        if only_in_folder1:
            print(f"Files only in {folder1}:")
            for file in only_in_folder1:
                print(f"- {file}")
        
        if only_in_folder2:
            print(f"\nFiles only in {folder2}:")
            for file in only_in_folder2:
                print(f"- {file}")
        
        if common_in_both:
            print(f"\nFiles common in both folders:")
            for file in common_in_both:
                print(f"- {file}")

            # Compare the line count for common files
            compare_line_counts(folder1, folder2, common_in_both)

    except Exception as e:
        print(f"Error: {e}")

def count_lines_in_file(file_path):
    """Count the number of lines in a file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return sum(1 for _ in file)  # Count the lines in the file
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return 0  # Return 0 lines in case of an error

def compare_line_counts(folder1, folder2, common_files):
    """Compare the line count for files that exist in both folders."""
    for file in common_files:
        file1_path = os.path.join(folder1, file)
        file2_path = os.path.join(folder2, file)

        lines_in_file1 = count_lines_in_file(file1_path)
        lines_in_file2 = count_lines_in_file(file2_path)

        if lines_in_file1 != lines_in_file2:
            print(f"\nLine count mismatch for file '{file}':")
            print(f"- {folder1}: {lines_in_file1} lines")
            print(f"- {folder2}: {lines_in_file2} lines")

def main():
    # Prompt the user to input the folder paths
    folder1 = input("Enter the path to the first folder: ").strip()
    folder2 = input("Enter the path to the second folder: ").strip()

    # Validate folder paths
    if not os.path.isdir(folder1):
        print(f"Error: The path '{folder1}' is not a valid folder.")
        return
    
    if not os.path.isdir(folder2):
        print(f"Error: The path '{folder2}' is not a valid folder.")
        return

    # Call the function to compare the two folders
    compare_folders(folder1, folder2)

if __name__ == "__main__":
    main()
