package main.src;

import java.sql.*;

import main.utilities.printResultSet;
import main.utilities.scannerHelper;
import oracle.jdbc.OracleTypes;

public class display {
    // Query to get the list of tables in the database
    private static final String getTablesQuery = "SELECT table_name FROM user_tables";
    private static Statement stmt = null;

    public static void displayTables(Connection conn) throws SQLException {
        try {
            // Create a statement
            stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);

            // Execute the query to get the list of tables
            ResultSet rs = stmt.executeQuery(getTablesQuery);
            System.out.println("Available tables: \n");
            rs.last();
            int rowCount = rs.getRow();
            // Move the cursor to the beginning
            rs.beforeFirst();

            Object[] rowValues = new Object[rowCount];
            // Display the list of tables
            for (int i = 0; i < rowCount; i++) {
                rs.next();
                rowValues[i] = rs.getObject("TABLE_NAME");
                System.out.println(i + 1 + ". " + rowValues[i]);
            }

            rs.close();
            stmt.close();

            System.out.println("Enter table no to view that table:");
            // Get the table number from the user
            int tableNO = scannerHelper.readInt();
            String tableName = rowValues[tableNO - 1].toString();
            displaySpecificTable(tableName, conn);

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public static void displaySpecificTable(String tableName, Connection conn) throws SQLException {
        try {

            // String query = "begin ? := project_display_pkg.get_" + tableName + "(); end;";
            String query = "begin ? := student_management_pkg_jdbc.get_" + tableName + "(); end;";
            CallableStatement cs = conn.prepareCall(query);

            cs.registerOutParameter(1, OracleTypes.CURSOR);
            cs.execute();

            ResultSet table = (ResultSet) cs.getObject(1);
            printResultSet.printObject(table);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
